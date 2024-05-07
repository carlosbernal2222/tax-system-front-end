import React, {useEffect, useState} from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import styles from './ReviewPage.module.css';
import {useNavigate} from "react-router-dom";

interface ReviewPageProps {
    taxReturnId: number;
}

interface Person{
    id?: number;
    ssn: string;
    firstName: string;
    middleName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
}

interface FormW2{
    employer: Employer;
    year: number;
    wages: number;
    federalIncomeTaxWithheld: number;
    socialSecurityTaxWithheld: number;
    medicareTaxWithheld: number;
}
interface Form1099{
    payer: string;
    wages: number;
    year: number;
}

interface TaxReturn {
    id: number;
    year: number;
    filingStatus: string | null;
    completed: boolean;
    totalRefundDue: number | null;
}

interface Employer{
    id: number;
    ein: string;
    name: string;
    address: string;
}

const ReviewPage: React.FC<ReviewPageProps> = ({ taxReturnId }) => {

    const navigate = useNavigate();
    const [person, setPerson] = useState<Person | null>(null);
    const [currentTaxReturn, setCurrentTaxReturn] = useState<TaxReturn | null>(null);
    const [formW2s, setFormW2s] = useState<FormW2[]>([]);
    const [form1099s, setForm1099s] = useState<Form1099[]>([]);

    useEffect(() => {
        fetchPersonData();
        fetchFormsData();
    }, [taxReturnId]);


    const fetchPersonData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/persons/${taxReturnId}/person`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch person data');
            }
            const data = await response.json();
            setPerson(data);
            const taxReturn = data.taxReturns.find(t => t.id === taxReturnId);
            if (taxReturn) {
                setCurrentTaxReturn(taxReturn);
            }
        } catch (error) {
            console.error('Error fetching person data:', error);
        }
    };
    const fetchFormsData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/returns/${taxReturnId}/forms`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch tax forms data');
            }
            const data = await response.json();
            setFormW2s(data.w2s);
            setForm1099s(data.form1099s);
        } catch (error) {
            console.error('Error fetching tax forms data:', error);
        }
    };


    const handleSubmit = async () => {
        try {
            // Fetch the tax due amount from the backend
            const response = await fetch(`http://localhost:8080/tax/calculate/${taxReturnId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to calculate tax due');
            }
            const taxDue = await response.json(); // Assuming the endpoint returns the tax due directly

            // Navigate to the result page with the tax due amount
            navigate(`/tax-filing/${taxReturnId}/result?amount=${taxDue.toFixed(2)}`, { replace: true });
        } catch (error) {
            console.error('Error calculating tax due:', error);
        }
    };


    return (
        <GridContainer className={styles.container}>
            <Grid row gap>
                <Grid col={12}><h1>Review Tax Return for ID: {taxReturnId}</h1></Grid>
            </Grid>
            <Grid row gap>
                <Grid col={6}>
                    <h2>Personal Information</h2>
                    <p><strong>Name:</strong> {person?.firstName} {person?.middleName} {person?.lastName}</p>
                    <p><strong>SSN:</strong> {person?.ssn}</p>
                    <p><strong>Phone:</strong> {person?.phoneNumber}</p>
                    <p><strong>Address:</strong> {person?.address}</p>
                </Grid>
                <Grid col={6}>
                    <h2>Tax Year and Filing Status</h2>
                    <p><strong>Year:</strong> {currentTaxReturn?.year}</p>
                    <p><strong>Status:</strong> {currentTaxReturn?.filingStatus}</p>
                </Grid>
            </Grid>
            <Grid row gap>
                <Grid col={6}>
                    <h2>W2 Forms</h2>
                    {formW2s.length > 0 ? formW2s.map((w2, index) => (
                        <div key={index} className={styles.formSection}>
                            <h3>W2 from {w2.employer.name}</h3>
                            <p><strong>Wages:</strong> ${w2.wages.toLocaleString()}</p>
                            <p><strong>Federal Income Tax Withheld:</strong> ${w2.federalIncomeTaxWithheld.toLocaleString()}</p>
                            <p><strong>Social Security Tax Withheld:</strong> ${w2.socialSecurityTaxWithheld.toLocaleString()}</p>
                            <p><strong>Medicare Tax Withheld:</strong> ${w2.medicareTaxWithheld.toLocaleString()}</p>
                        </div>
                    )) : <p>No W2 forms available.</p>}
                </Grid>
                <Grid col={6}>
                    <h2>1099 Forms</h2>
                    {form1099s.length > 0 ? form1099s.map((form1099, index) => (
                        <div key={index} className={styles.formSection}>
                            <h3>1099 from {form1099.payer}</h3>
                            <p><strong>Amount:</strong> ${form1099.wages.toLocaleString()}</p>
                            <p><strong>Year:</strong> {form1099.year}</p>
                        </div>
                    )) : <p>No 1099 forms available.</p>}
                </Grid>
            </Grid>
            <div className={styles.buttonContainer}>
                <button onClick={handleSubmit} className="usa-button">Submit Tax Return</button>
            </div>
        </GridContainer>
    );
};

export default ReviewPage;
