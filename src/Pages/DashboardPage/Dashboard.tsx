import React, { useEffect, useState, useRef } from 'react';
import {Button, Card, CardHeader, CardBody, CardFooter, Grid, GridContainer, Alert} from '@trussworks/react-uswds';
import styles from './Dashboard.module.css';
import { useNavigate } from "react-router-dom";
import {useTranslation} from "react-i18next";

interface TaxFiling {
    id: number;
    year: number;
    completed: boolean;
    totalRefundDue: number | null;  // Optional property
}

const Dashboard: React.FC = () => {
    const [filings, setFilings] = useState<TaxFiling[]>([]);
    const navigate = useNavigate();
    const personIdRef = useRef<number | null>(null); //refernce to person id
    const { t } = useTranslation();

    useEffect(() => {
        /**
         * Fetches the person ID from the server and sets it in the personIdRef.
         * Then calls the fetchTaxFilings function.
         */
        const fetchPersonId = async () => {
            try {
                const response = await fetch('http://team8.skillstorm-congo.com:8080/persons/tokenPerson', {
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
                personIdRef.current = data.id; 
                console.log('Person ID:', personIdRef.current);

                // Call fetchTaxFilings after setting personIdRef.current
                fetchTaxFilings();
            } catch (error) {
                console.error('Error fetching person ID:', error);
            }
        };
        fetchPersonId();
    }, []);

    /**
     * Asynchronously fetches tax filings for a person.
     *
     * This function first checks if a person ID is available. If not, it logs a message and exits.
     * If a person ID is available, it makes a GET request to the server to fetch the tax returns for the person with the given ID.
     * If the request is successful, it updates the state with the fetched data.
     * If the request fails, it logs an error.
     *
     * @async
     */
    const fetchTaxFilings = async () => {
        try {
            if (personIdRef.current !== null) {
                const response = await fetch(`http://team8.skillstorm-congo.com:8080/persons/${personIdRef.current}/tax-returns`, {
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

    /**
     * Asynchronously starts a new tax filing.
     *
     * This function first checks if a person ID is available. If not, it logs an error and exits.
     * If a person ID is available, it creates a new tax return object with the current year,
     * sets the completed status to false, and totalRefundDue to null.
     *
     * It then makes a POST request to the server to create a new tax return for the person with the given ID.
     * If the request is successful, it navigates to the personal information page with the new filing ID.
     * If the request fails, it logs an error.
     *
     * @async
     */
    const handleStartNewFiling = async () => {
        if (personIdRef.current === null) {
            console.error('No person ID available');
            return; // Exit the function if there is no person ID
        }

        try {
            const newTaxReturn = {
                year: new Date().getFullYear(),
                completed: false,
                totalRefundDue: null
            };

            const response = await fetch(`http://team8.skillstorm-congo.com:8080/returns/${personIdRef.current}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // if needed for session/cookie-based authentication
                body: JSON.stringify(newTaxReturn)
            });

            if (!response.ok) {
                throw new Error('Failed to create new tax filing');
            }

            const createdFiling = await response.json();

            // Navigate to the personal information page with the new filing ID
            navigate(`/tax-filing/${createdFiling.id}/personal-information`);

        } catch (error) {
            console.error('Error creating new tax filing:', error);
        }
    };


    /**
     * Handles continue filing for a given ID.
     *
     * @param {number} id - The ID of the filing to continue.
     */
    const handleContinueFiling = (id: number) => {
        console.log(`Continuing filing for ID ${id}`);
        navigate(`/tax-filing/${id}/personal-information`);
    };

    /**
     * Displays the tax information for a given tax filing.
     *
     * @param {TaxFiling} filing - The tax filing object.
     * @returns {string} - The tax information message.
     */
    const displayTaxInfo = (filing: TaxFiling) => {
        const refundDue = filing.totalRefundDue;
        if (refundDue === null) return "Not Calculated";
        if (refundDue >= 0) return `Tax Due: $${Math.abs(refundDue).toFixed(2)}`;
        return `Tax Refund: $${Math.abs(refundDue).toFixed(2)}`;
    };

    return (
        <div className={styles.dashboardContainer}>
            <h1 className={styles.header}>{t("Tax Filings Dashboard")}</h1>
            <Button type="button" onClick={handleStartNewFiling} className={`usa-button ${styles.buttonNewFiling}`}>
                {t("Start New Filing")}
            </Button>

            <GridContainer className={styles.cardContainer}>
                <Grid row gap>
                    {filings.length > 0 ? filings.map((filing) => (
                        <Grid col={12} tablet={{ col: 6 }} desktop={{ col: 4 }} key={filing.id}>
                            <Card className={styles.taxCard}>
                                <CardHeader>
                                    <h2 className={styles.cardTitle}>{t("Filing ID")}: {filing.id}</h2>
                                </CardHeader>
                                <CardBody>
                                    <p>{t("Year")}: {filing.year}</p>
                                    <p>{t("Status")}: {filing.completed ? t("Completed") : t("In Progress")}</p>
                                    <p>{displayTaxInfo(filing)}</p>
                                </CardBody>
                                <CardFooter>
                                    {!filing.completed && (
                                        <Button type="button" onClick={() => handleContinueFiling(filing.id)} className="usa-button usa-button--secondary">
                                            {t("Continue Filing")}
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        </Grid>
                    )) : (
                        <div className={styles.alertContainer}>
                            <Alert type="info" headingLevel={"h2"} className={styles.alertInfo}>{t("No tax filings available.")}</Alert>
                        </div>
                    )}
                </Grid>
            </GridContainer>
        </div>
    );
};

export default Dashboard;