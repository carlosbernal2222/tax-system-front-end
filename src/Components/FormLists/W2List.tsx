import React, { useEffect, useState } from 'react';
import {Button, Table} from '@trussworks/react-uswds';

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
        <div>
            <h3>W2 Forms List</h3>
            {w2Forms.length > 0 ? (
                <Table fullWidth>
                    <thead>
                    <tr>
                        <th>Year</th>
                        <th>Wages</th>
                        <th>Federal Tax Withheld</th>
                        <th>Social Security Withheld</th>
                        <th>Medicare Withheld</th>
                        <th>Actions</th>
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
                                <Button onClick={() => handleDelete(form.id)} secondary type="button">Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            ) : (
                <p>No W2 Forms found for this tax return.</p>
            )}
        </div>
    );
};

export default W2List;
