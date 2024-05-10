import React, { useEffect, useState } from 'react';
import { Button, Table } from '@trussworks/react-uswds';
import {useTranslation} from 'react-i18next';

interface Form1099 {
    id: number;
    year: number;
    wages: number;
    payer: string;
}

interface Form1099ListProps {
    taxReturnId: number;
    refresh: boolean;
}

const Form1099List: React.FC<Form1099ListProps> = ({ taxReturnId, refresh }) => {
    const [form1099s, setForm1099s] = useState<Form1099[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        /**
         * Fetches Form 1099s from the server based on the tax return ID.
         */
        const fetchForm1099s = async () => {
            try {
                const response = await fetch(`http://team8.skillstorm-congo.com:8080/form1099s/tax-return/${taxReturnId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch Form 1099s');
                }
                const data = await response.json();
                setForm1099s(data);
            } catch (error) {
                console.error('Error fetching Form 1099s:', error);
            }
        };

        fetchForm1099s();
    }, [taxReturnId, refresh]);

    /**
     * Handles the deletion of a Form 1099.
     * @param id - The ID of the Form 1099 to delete.
     */
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://team8.skillstorm-congo.com:8080/form1099s/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                setForm1099s(form1099s.filter(form => form.id !== id));
            } else {
                throw new Error('Failed to delete the Form 1099');
            }
        } catch (error) {
            console.error('Error deleting Form 1099:', error);
        }
    };

    return (
        <div>
            <h3>{t('Form 1099 List')}</h3>
            {form1099s.length > 0 ? (
                <Table fullWidth>
                    <thead>
                    <tr>
                        <th>{t('Payer')}</th>
                        <th>{t('Year')}</th>
                        <th>{t('Wages')}</th>
                        <th>{t('Actions')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {form1099s.map(form => (
                        <tr key={form.id}>
                            <td>{form.payer}</td>
                            <td>{form.year}</td>
                            <td>{form.wages}</td>
                            <td>
                                <Button onClick={() => handleDelete(form.id)} secondary type="button">{t('Delete')}</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            ) : (
                <p>{t('No Form 1099s found for this tax return.')}</p>
            )}
        </div>
    );

};

export default Form1099List;
