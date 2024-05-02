// src/components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Grid, GridContainer } from '@trussworks/react-uswds';
import styles from './Dashboard.module.css';
import {useNavigate} from "react-router-dom";

interface TaxFiling {
    id: number;
    year: number;
    status: string;
    returnedAmount?: number | null;
}

const Dashboard: React.FC = () => {
    const [filings, setFilings] = useState<TaxFiling[]>([]);
    const navigate = useNavigate();

    // Simulate fetching data from an API
    useEffect(() => {

        //Mock Get Request of the Tax Returns
        //This function will be replaced with the actual API call
        const fetchTaxFilings = async () => {
            // Simulated fetch delay
            const mockApiResponse: TaxFiling[] = await new Promise(resolve => setTimeout(() => resolve([
                { id: 1, year: 2021, status: 'Completed', returnedAmount: 1200 },
                { id: 2, year: 2022, status: 'In Progress', returnedAmount: null },
                { id: 3, year: 2023, status: 'In Progress', returnedAmount: null },
                { id: 4, year: 2024, status: 'In Progress', returnedAmount: null },
                { id: 5, year: 2025, status: 'In Progress', returnedAmount: null },
                { id: 6, year: 2026, status: 'In Progress', returnedAmount: null }
            ]), 1000));

            setFilings(mockApiResponse);
        };

        fetchTaxFilings();
    }, []);


    const handleStartNewFiling = async () => {
        // Simulated API call to create a new tax filing
        const newFiling: TaxFiling = await new Promise(resolve => setTimeout(() => resolve({
            id: filings.length + 1, // incremeting the ID
            year: new Date().getFullYear(),
            status: 'In Progress',
            returnedAmount: null,
        }), 500));

        setFilings([...filings, newFiling]); // Update state with the new filing

        // Navigate to the personal information page with the new filing ID under the nested route
        navigate(`/tax-filing/${newFiling.id}/personal-information`);
    };

    const handleContinueFiling = (id: number) => {
        console.log(`Continuing filing for ID ${id}`);
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
                                    <p>Status: {filing.status}</p>
                                    {filing.returnedAmount && <p>Returned: ${filing.returnedAmount}</p>}
                                </CardBody>
                                <CardFooter>
                                    {filing.status !== 'Completed' && (
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
