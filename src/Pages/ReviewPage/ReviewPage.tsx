import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import styles from './ReviewPage.module.css';
import {useNavigate} from "react-router-dom";

interface ReviewPageProps {
    taxReturnId: number;
}

const ReviewPage: React.FC<ReviewPageProps> = ({ taxReturnId }) => {

    const navigate = useNavigate();

    // mock data for display
    const taxReturn = {
        person: {
            firstName: "John",
            lastName: "Doe",
            ssn: "123-45-6789",
            phone: "123-456-7890",
            address: "123 Main St"
        },
        year: 2022,
        filingStatus: "Single",
        formW2s: [
            { employer: "Employer A", wages: 50000, federalIncomeTaxWithheld: 5000, socialSecurityTaxWithheld: 3000, medicareTaxWithheld: 1000 },
            { employer: "Employer B", wages: 60000, federalIncomeTaxWithheld: 7000, socialSecurityTaxWithheld: 4000, medicareTaxWithheld: 2000 }
        ],
        form1099s: [
            { payer: "Client A", amount: 10000, year: 2021 },
            { payer: "Client B", amount: 20000, year: 2021 }
        ]
    };

    //mock function to calculate tax due or refund
    const calculateTaxDue = () => {
        const totalWages = taxReturn.formW2s.reduce((acc, curr) => acc + curr.wages, 0);
        const totalWithheld = taxReturn.formW2s.reduce((acc, curr) => acc + curr.federalIncomeTaxWithheld, 0);
        const total1099Income = taxReturn.form1099s.reduce((acc, curr) => acc + curr.amount, 0);
        const estimatedTax = (totalWages + total1099Income) * 0.25; // Dummy tax rate calculation
        return estimatedTax - totalWithheld;
    };

    //Replace with actual endpoint to calculate tax due
    const handleSubmit = () => {
        const taxDue = calculateTaxDue();

        // Correcting the navigate call to avoid duplicating "result" in the URL
        navigate(`/tax-filing/${taxReturnId}/result?amount=${taxDue.toFixed(2)}`, { replace: true });

    };




    return (
        <GridContainer className={styles.container}>
            <Grid row gap>
                <Grid col={12}><h1>Review Tax Return for ID: {taxReturnId}</h1></Grid>
            </Grid>
            <Grid row gap>
                <Grid col={6}>
                    <h2>Personal Information</h2>
                    <p><strong>Name:</strong> {taxReturn.person.firstName} {taxReturn.person.lastName}</p>
                    <p><strong>SSN:</strong> {taxReturn.person.ssn}</p>
                    <p><strong>Phone:</strong> {taxReturn.person.phone}</p>
                    <p><strong>Address:</strong> {taxReturn.person.address}</p>
                </Grid>
                <Grid col={6}>
                    <h2>Tax Year and Filing Status</h2>
                    <p><strong>Year:</strong> {taxReturn.year}</p>
                    <p><strong>Status:</strong> {taxReturn.filingStatus}</p>
                </Grid>
            </Grid>
            <Grid row gap>
                <Grid col={6}>
                    <h2>W2 Forms</h2>
                    {taxReturn.formW2s.map((w2, index) => (
                        <div key={index} className={styles.formSection}>
                            <h3>W2 from {w2.employer}</h3>
                            <p><strong>Wages:</strong> ${w2.wages}</p>
                            <p><strong>Federal Income Tax Withheld:</strong> ${w2.federalIncomeTaxWithheld}</p>
                            <p><strong>Social Security Tax Withheld:</strong> ${w2.socialSecurityTaxWithheld}</p>
                            <p><strong>Medicare Tax Withheld:</strong> ${w2.medicareTaxWithheld}</p>
                        </div>
                    ))}
                </Grid>
                <Grid col={6}>
                    <h2>1099 Forms</h2>
                    {taxReturn.form1099s.map((form1099, index) => (
                        <div key={index} className={styles.formSection}>
                            <h3>1099 from {form1099.payer}</h3>
                            <p><strong>Amount:</strong> ${form1099.amount}</p>
                            <p><strong>Year:</strong> {form1099.year}</p>
                        </div>
                    ))}
                </Grid>
            </Grid>
            <div className={styles.buttonContainer}>
                <button onClick={handleSubmit} className="usa-button">Submit Tax Return</button>
            </div>
        </GridContainer>
    );
};

export default ReviewPage;
