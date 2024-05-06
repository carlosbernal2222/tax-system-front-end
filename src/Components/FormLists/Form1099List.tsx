import React, { useEffect, useState } from 'react';
import { Button, Table } from '@trussworks/react-uswds';

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

    useEffect(() => {
        const fetchForm1099s = async () => {
            try {
                const response = await fetch(`http://localhost:8080/form1099s/tax-return/${taxReturnId}`, {
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

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/form1099s/${id}`, {
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
            <h3>Form 1099 List</h3>
            {form1099s.length > 0 ? (
                <Table fullWidth>
                    <thead>
                    <tr>
                        <th>Payer</th>
                        <th>Year</th>
                        <th>Wages</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {form1099s.map(form => (
                        <tr key={form.id}>
                            <td>{form.payer}</td>
                            <td>{form.year}</td>
                            <td>{form.wages}</td>
                            <td>
                                <Button onClick={() => handleDelete(form.id)} secondary type="button">Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            ) : (
                <p>No Form 1099s found for this tax return.</p>
            )}
        </div>
    );
};

export default Form1099List;
