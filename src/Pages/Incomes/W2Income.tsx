import React, { useState } from 'react';
import CreateW2Form from '../../Components/Forms/CreateW2Form.tsx';
import W2List from '../../Components/FormLists/W2List.tsx';
import { Grid, GridContainer, Alert } from '@trussworks/react-uswds';
import {useTranslation} from 'react-i18next';
import styles from './W2Income.module.css';

interface W2IncomeProps {
    taxReturnId: number;
}

interface FormW2 {
    employerId: number;
    year: number;
    wages: number;
    federalIncomeTaxWithheld: number;
    socialSecurityTaxWithheld: number;
    medicareTaxWithheld: number;
    taxReturnId?: number;
}

const W2Income: React.FC<W2IncomeProps> = ({ taxReturnId }) => {
    const [refresh, setRefresh] = useState<boolean>(false); // State to trigger refresh
    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const {t} = useTranslation();
    const handleCreateForm = async (form: FormW2) => {
        try {
            const response = await fetch('http://team8.skillstorm-congo.com:8080/w2s', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                    taxReturnId: taxReturnId,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create W2 form');
            }

            const result = await response.json();
            console.log('Form created successfully:', result);
            setAlert({ type: 'success', message: 'W2 form created successfully!' });
            setTimeout(() => setAlert(null), 5000);
            setRefresh(!refresh); // Toggle refresh state to trigger an update in the W2 list
        } catch (error) {
            console.error('Error creating W2 form:', error);
            setAlert({ type: 'error', message: 'Error creating W2 form. Please try again.' });
        }
    };

    return (
        <GridContainer className={styles.container}>
            <div className={styles.header}>{t('W2 Income for Tax Return ID: {{id}}', { id: taxReturnId })}</div>
            {alert && <Alert headingLevel={"h2"} type={alert.type} role="alert">{t(alert.message)}</Alert>}
            <Grid row gap className={styles.grid}>
                <Grid col={12} tablet={{ col: 8 }} className={styles.formContainer}>
                    <CreateW2Form taxReturnId={taxReturnId} onCreate={handleCreateForm} />
                </Grid>
                <Grid col={12} tablet={{ col: 12 }} className={styles.listContainer}>
                    <W2List taxReturnId={taxReturnId} refresh={refresh} />
                </Grid>
            </Grid>
        </GridContainer>
    );
};

export default W2Income;
