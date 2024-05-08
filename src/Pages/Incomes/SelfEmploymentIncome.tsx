import React, { useState } from 'react';
import Create1099Form from '../../Components/Forms/Create1099Form.tsx';
import Form1099List from "../../Components/FormLists/Form1099List.tsx";
import { Alert, Grid, GridContainer } from "@trussworks/react-uswds";
import styles from './SelfEmploymentIncome.module.css';

interface SelfEmploymentIncomeProps {
    taxReturnId: number;
}

interface Form1099 {
    year: number;
    wages: number;
    payer: string;
    taxReturnId?: number;
}

const SelfEmploymentIncome: React.FC<SelfEmploymentIncomeProps> = ({ taxReturnId }) => {
    const [refresh, setRefresh] = useState(false);
    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleCreateForm = async (form: Form1099) => {
        try {
            const response = await fetch('http://localhost:8080/form1099s', {
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
                throw new Error('Failed to create Form 1099');
            }

            await response.json();
            setAlert({ type: 'success', message: 'Form 1099 created successfully!' });
            setTimeout(() => setAlert(null), 5000);
            setRefresh(!refresh); // Trigger a refresh of the list
        } catch (error) {
            console.error('Error creating Form 1099:', error);
            setAlert({ type: 'error', message: 'Error creating Form 1099. Please try again.' });
        }
    };

    return (
        <GridContainer className={styles.container}>
            <div className={styles.header}>Self Employment Income for Tax Return ID: {taxReturnId}</div>
            {alert && <Alert headingLevel={"h2"} type={alert.type} role="alert">{alert.message}</Alert>}
            <Grid row gap className={styles.grid}>
                <Grid col={12} tablet={{ col: 8 }} className={styles.formContainer}>
                    <Create1099Form taxReturnId={taxReturnId} onCreate={handleCreateForm} />
                </Grid>
                <Grid col={12} tablet={{ col: 12 }} className={styles.listContainer}>
                    <Form1099List taxReturnId={taxReturnId} refresh={refresh} />
                </Grid>
            </Grid>
        </GridContainer>
    );
};

export default SelfEmploymentIncome;
