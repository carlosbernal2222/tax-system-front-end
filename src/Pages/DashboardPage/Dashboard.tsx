import React, { useEffect, useState, useRef } from 'react';
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
    const personIdRef = useRef<number | null>(null); //refernce to person id

    useEffect(() => {
        const fetchPersonId = async () => {
            try { //call to retrieve person for token
                const response = await fetch('http://localhost:8080/persons/tokenPerson', {
                    credentials: 'include',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch person ID');
                }
                const data = await response.json();
                personIdRef.current = data.id; // Assuming your response contains the person ID
                console.log('Person ID:', personIdRef.current);

                // Call fetchTaxFilings after setting personIdRef.current
                fetchTaxFilings();
            } catch (error) {
                console.error('Error fetching person ID:', error);
            }
        };

        fetchPersonId();
    }, []);

    const fetchTaxFilings = async () => {
        try {
            if (personIdRef.current !== null) {
                const response = await fetch(`http://localhost:8080/persons/${personIdRef.current}/tax-returns`, {
                    credentials: 'include',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch tax filings');
                }
                const data = await response.json();
                setFilings(data);  // Set state with fetched data
            } else {
                console.log('Person ID is not available yet');
            }
        } catch (error) {
            console.error('Error fetching tax filings:', error);
        }
    };

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