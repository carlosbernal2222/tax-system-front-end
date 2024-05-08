import React, { useEffect, useState } from 'react';
import {Button, Grid, GridContainer, Table} from '@trussworks/react-uswds';
import {useTranslation} from 'react-i18next';

interface W2ListProps {
    taxReturnId: number;
    refresh: boolean;
}

interface FormW2 {
    id: number;
    employerId: number;
    year: number;
    wages: number;
    federalIncomeTaxWithheld: number;
    socialSecurityTaxWithheld: number;
    medicareTaxWithheld: number;
}

const W2List: React.FC<W2ListProps> = ({ taxReturnId,refresh }) => {
    const [w2Forms, setW2Forms] = useState<FormW2[]>([]);
    const {t} = useTranslation();

    useEffect(() => {
        const fetchW2Forms = async () => {
            try {
                const response = await fetch(`http://localhost:8080/w2s/tax-return/${taxReturnId}`, {
                    method: 'GET',  // Explicitly set the method for clarity, though 'GET' is the default
                    credentials: 'include',  // Ensures cookies, authorization headers, etc., are sent with the request
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch W2 forms');
                }
                const data = await response.json();
                setW2Forms(data);
            } catch (error) {
                console.error('Error fetching W2 forms:', error);
            }
        };

        fetchW2Forms();
    }, [taxReturnId, refresh]);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/w2s/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                setW2Forms(w2Forms.filter(form => form.id !== id));
            } else {
                throw new Error('Failed to delete the W2 form');
            }
        } catch (error) {
            console.error('Error deleting W2 form:', error);
        }
    };



    return (
        <GridContainer>
            <h3>{t('W2 Forms List')}</h3>
            <Grid row>
                <Grid col={12}>
                    <Table fullWidth>
                        <thead>
                        <tr>
                            <th>{t('Year')}</th>
                            <th>{t('Wages')}</th>
                            <th>{t('Federal Tax Withheld')}</th>
                            <th>{t('Social Security Withheld')}</th>
                            <th>{t('Medicare Withheld')}</th>
                            <th>{t('Actions')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {w2Forms.map(form => (
                            <tr key={form.id}>
                                <td>{form.year}</td>
                                <td>{form.wages}</td>
                                <td>{form.federalIncomeTaxWithheld}</td>
                                <td>{form.socialSecurityTaxWithheld}</td>
                                <td>{form.medicareTaxWithheld}</td>
                                <td>
                                    <Button onClick={() => handleDelete(form.id)} secondary type="button">{t('Delete')}</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Grid>
            </Grid>
        </GridContainer>
    );

};

export default W2List;
