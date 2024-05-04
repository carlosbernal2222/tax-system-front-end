import React, { useEffect, useState } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Grid, GridContainer } from '@trussworks/react-uswds';
import styles from './Dashboard.module.css';
import { useNavigate } from "react-router-dom";

interface TaxFiling {
    id: number;
    year: number;
    completed: boolean;
    totalRefundDue?: number | null;  // Ensure this is optional and can be null
}

const Dashboard: React.FC = () => {
    const [filings, setFilings] = useState<TaxFiling[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTaxFilings = async () => {
            try {
                //Here I need to access the person id that is associated with the logged in user and pass it to the URL
                const response = await fetch('http://localhost:8080/persons/1/tax-returns',  {
                    credentials: 'include',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFilings(data);  // Set state with fetched data
            } catch (error) {
                console.error('Error fetching persons TaxFilings', error);
            }
        };

        fetchTaxFilings();
    }, []);

    const handleStartNewFiling = async () => {
        const newFiling: TaxFiling = {
            id: filings.length + 1,
            year: new Date().getFullYear(),
            completed: false,
            totalRefundDue: null,
        };

        setFilings([...filings, newFiling]);
        navigate(`/tax-filing/${newFiling.id}/personal-information`);
    };
    
    const handleContinueFiling = (id: number) => {
        console.log(`Continuing filing for ID ${id}`);
        navigate(`/tax-filing/${id}/personal-information`);
    };

    return (
        <div className={styles.dashboardContainer}>
            <h1 className={styles.header}>Tax Filings Dashboard</h1>
            <Button type="button" onClick={handleStartNewFiling} className={`usa-button ${styles.buttonNewFiling}`}>
                Start New Filing
            </Button>
            <GridContainer className={styles.cardContainer}>
                <Grid row gap>
                    {filings.length > 0 ? filings.map((filing) => (
                        <Grid col={12} tablet={{ col: 6 }} desktop={{ col: 4 }} key={filing.id}>
                            <Card className={styles.taxCard}>
                                <CardHeader>
                                    <h2 className={styles.cardTitle}>Filing ID: {filing.id}</h2>
                                </CardHeader>
                                <CardBody>
                                    <p>Year: {filing.year}</p>
                                    <p>Status: {filing.completed ? "Completed" : "In Progress"}</p>
                                    <p>Refund Due: {filing.totalRefundDue !== null ? `$${filing.totalRefundDue}` : "Not Calculated"}</p>
                                </CardBody>
                                <CardFooter>
                                    {!filing.completed && (
                                        <Button type="button" onClick={() => handleContinueFiling(filing.id)} className="usa-button usa-button--secondary">
                                            Continue Filing
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        </Grid>
                    )) : (
                        <p>Loading tax filings...</p>
                    )}
                </Grid>
            </GridContainer>
        </div>
    );
};

export default Dashboard;
