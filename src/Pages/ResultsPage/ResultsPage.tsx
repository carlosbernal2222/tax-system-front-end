import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {GridContainer, Button, Card, CardHeader, CardBody, Alert } from '@trussworks/react-uswds';
import styles from './ResultsPage.module.css';
import {useTranslation} from "react-i18next";

const ResultsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const amount = parseFloat(queryParams.get('amount') || '0');

    const isRefund = amount < 0;
    const displayAmount = Math.abs(amount).toFixed(2);
    const resultType = isRefund ? 'Refund' : 'Tax Due';
    const alertType = isRefund ? 'success' : 'warning';
    const { t } = useTranslation();

    /**
     * Navigates to the dashboard page.
     *
     * Ensure this path matches your application's routes.
     *
     * @function
     * @name navigateToDashboard
     */
    const navigateToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <GridContainer className={styles.container}>
            <Card className={styles.cardContainer}>
                <CardHeader className={styles.header}>
                    <h2>{t(resultType)}</h2>
                </CardHeader>
                <CardBody className={styles.body}>
                    <Alert headingLevel={"h1"} type={alertType} slim>
                        <strong>${displayAmount}</strong>
                    </Alert>
                    <p>{t('The calculated {{resultType}} for your tax return is shown above.', { resultType: t(resultType.toLowerCase()) })}</p>
                    <div className={styles.buttonContainer}>
                        <Button type="button" onClick={navigateToDashboard}>
                            {t('Back to Dashboard')}
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </GridContainer>
    );

}

export default ResultsPage;
