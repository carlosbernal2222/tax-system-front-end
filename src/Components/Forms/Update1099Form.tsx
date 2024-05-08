import React, { useState, useEffect } from 'react';
import { TextInput, Button, Grid, GridContainer, Label } from '@trussworks/react-uswds';
import { useTranslation } from 'react-i18next';

interface Update1099FormProps {
    form1099Id: number;
}

interface Form1099 {
    id: number;
    payer: string;
    wages: number;
    year: number;
}

const Update1099Form: React.FC<Update1099FormProps> = ({ form1099Id }) => {
    const [form1099, setForm1099] = useState<Form1099>({ id: form1099Id, payer: '', wages: 0, year: new Date().getFullYear() });
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

    console.log(form1099)

    useEffect(() => {
        const fetchForm1099Data = async () => {
            try {
                const response = await fetch(`http://localhost:8080/form1099s/${form1099Id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch Form 1099 data');
                }
                const data: Form1099 = await response.json();
                setForm1099(data);
            } catch (error) {
                console.error('Error fetching Form 1099 data:', error);
            }
            setIsLoading(false);
        };

        fetchForm1099Data();
    }, [form1099Id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm1099(prevState => ({ ...prevState, [name]: name === 'wages' ? parseFloat(value) : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/form1099s`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(form1099)
            });
            if (!response.ok) {
                throw new Error('Failed to update Form 1099');
            }
            alert('Form 1099 updated successfully!');
        } catch (error) {
            console.error('Error updating Form 1099:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <GridContainer className="padding-2">
            <form onSubmit={handleSubmit}>
                <Grid row gap>
                    <Grid col={12} tablet={{ col: 4 }}>
                        <Label htmlFor="payer">{t('Payer')}</Label>
                        <TextInput id="payer" name="payer" type="text" value={form1099.payer} onChange={handleChange} />
                    </Grid>
                    <Grid col={12} tablet={{ col: 4 }}>
                        <Label htmlFor="wages">{t('Wages')}</Label>
                        <TextInput id="wages" name="wages" type="number" value={form1099.wages.toString()} onChange={handleChange} />
                    </Grid>
                    <Grid col={12} tablet={{ col: 3 }}>
                        <Label htmlFor="year">{t('Year')}</Label>
                        <TextInput id="year" name="year" type="number" value={form1099.year.toString()} onChange={handleChange} />
                    </Grid>
                    <Grid col={12} className={"display-flex flex-column flex-align-center"}>
                        <Button type="submit" style={{ marginTop: '20px' }}>{t('Update')}</Button>
                    </Grid>
                </Grid>
            </form>
        </GridContainer>
    );
};

export default Update1099Form;
