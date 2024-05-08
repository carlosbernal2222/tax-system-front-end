import React, { useState, useEffect } from 'react';
import { TextInput, Button, Grid, GridContainer, Label } from '@trussworks/react-uswds';
import { useTranslation } from 'react-i18next';

interface UpdateW2FormProps {
    formW2Id: number;
}

interface FormW2 {
    id: number;
    employer: string; // Adjust based on actual employer details
    year: number;
    wages: number;
    federalIncomeTaxWithheld: number;
    socialSecurityTaxWithheld: number;
    medicareTaxWithheld: number;
}

const UpdateW2Form: React.FC<UpdateW2FormProps> = ({ formW2Id }) => {
    const [formW2, setFormW2] = useState<FormW2>({
        id: formW2Id,
        employer: '',
        year: new Date().getFullYear(),
        wages: 0,
        federalIncomeTaxWithheld: 0,
        socialSecurityTaxWithheld: 0,
        medicareTaxWithheld: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchW2Data = async () => {
            try {
                const response = await fetch(`http://localhost:8080/w2s/${formW2Id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch W2 data');
                }
                const data: FormW2 = await response.json();
                setFormW2(data);
            } catch (error) {
                console.error('Error fetching W2 data:', error);
            }
            setIsLoading(false);
        };

        fetchW2Data();
    }, [formW2Id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormW2(prevState => ({ ...prevState, [name]: parseFloat(value) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/w2s`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formW2)
            });
            if (!response.ok) {
                throw new Error('Failed to update W2');
            }
            alert('W2 updated successfully!');
        } catch (error) {
            console.error('Error updating W2:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <GridContainer>
            <form onSubmit={handleSubmit}>
                <Grid row gap>
                    <Grid col={12}>
                        <Label htmlFor="employer">{t('Employer')}</Label>
                        <TextInput id="employer" name="employer" type="text" value={formW2.employer} onChange={handleChange} />
                    </Grid>
                    <Grid col={12}>
                        <Label htmlFor="wages">{t('Wages')}</Label>
                        <TextInput id="wages" name="wages" type="number" value={formW2.wages.toString()} onChange={handleChange} />
                    </Grid>
                    <Grid col={12}>
                        <Label htmlFor="federalIncomeTaxWithheld">{t('Federal Income Tax Withheld')}</Label>
                        <TextInput id="federalIncomeTaxWithheld" name="federalIncomeTaxWithheld" type="number" value={formW2.federalIncomeTaxWithheld.toString()} onChange={handleChange} />
                    </Grid>
                    <Grid col={12}>
                        <Label htmlFor="socialSecurityTaxWithheld">{t('Social Security Tax Withheld')}</Label>
                        <TextInput id="socialSecurityTaxWithheld" name="socialSecurityTaxWithheld" type="number" value={formW2.socialSecurityTaxWithheld.toString()} onChange={handleChange} />
                    </Grid>
                    <Grid col={12}>
                        <Label htmlFor="medicareTaxWithheld">{t('Medicare Tax Withheld')}</Label>
                        <TextInput id="medicareTaxWithheld" name="medicareTaxWithheld" type="number" value={formW2.medicareTaxWithheld.toString()} onChange={handleChange} />
                    </Grid>
                    <Grid col={12}>
                        <Label htmlFor="year">{t('Year')}</Label>
                        <TextInput id="year" name="year" type="number" value={formW2.year.toString()} onChange={handleChange} />
                    </Grid>
                </Grid>
                <Button type="submit">{t('Update W2')}</Button>
            </form>
        </GridContainer>
    );

};

export default UpdateW2Form;
