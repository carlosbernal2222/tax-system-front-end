import React, { useState, ChangeEvent, FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextInput, Label, Grid, GridContainer } from '@trussworks/react-uswds';
import styles from './W2Income.module.css';

interface W2Form {
    id: string;
    employer: string;
    year: string;
    wages: string;
    federalIncomeTaxWithheld: string;
    socialSecurityTaxWithheld: string;
    medicareTaxWithheld: string;
}

interface W2IncomeProps {
    taxReturnId: number;
}

const W2Income: React.FC<W2IncomeProps> = ({ taxReturnId }) => {
    const [w2s, setW2s] = useState<W2Form[]>([]);
    const [w2, setW2] = useState<W2Form>({
        id: uuidv4(),
        employer: '',
        year: '',
        wages: '',
        federalIncomeTaxWithheld: '',
        socialSecurityTaxWithheld: '',
        medicareTaxWithheld: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setW2({ ...w2, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitting W2 Form for Tax Return ID:", taxReturnId, w2);
        setW2s([...w2s, w2]);
        setW2({
            id: uuidv4(),
            employer: '',
            year: '',
            wages: '',
            federalIncomeTaxWithheld: '',
            socialSecurityTaxWithheld: '',
            medicareTaxWithheld: ''
        }); // Reset the form after submission
    };

    const handleEdit = (id: string) => {
        const formToEdit = w2s.find(item => item.id === id);
        if (formToEdit) {
            setW2(formToEdit);
        }
    };

    const handleDelete = (id: string) => {
        setW2s(w2s.filter(item => item.id !== id));
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <GridContainer className={styles.formGrid}>
                    <Grid row gap>
                        <Grid col={6}>
                            <Label htmlFor={`employer-${w2.id}`}>Employer</Label>
                            <TextInput id={`employer-${w2.id}`} name="employer" type="text" value={w2.employer} onChange={handleChange} />
                        </Grid>
                        <Grid col={6}>
                            <Label htmlFor={`year-${w2.id}`}>Year</Label>
                            <TextInput id={`year-${w2.id}`} name="year" type="text" value={w2.year} onChange={handleChange} />
                        </Grid>
                        <Grid col={4}>
                            <Label htmlFor={`wages-${w2.id}`}>Wages</Label>
                            <TextInput id={`wages-${w2.id}`} name="wages" type="text" value={w2.wages} onChange={handleChange} />
                        </Grid>
                        <Grid col={4}>
                            <Label htmlFor={`federalIncomeTaxWithheld-${w2.id}`}>Federal Income Tax Withheld</Label>
                            <TextInput id={`federalIncomeTaxWithheld-${w2.id}`} name="federalIncomeTaxWithheld" type="text" value={w2.federalIncomeTaxWithheld} onChange={handleChange} />
                        </Grid>
                        <Grid col={4}>
                            <Label htmlFor={`socialSecurityTaxWithheld-${w2.id}`}>Social Security Tax Withheld</Label>
                            <TextInput id={`socialSecurityTaxWithheld-${w2.id}`} name="socialSecurityTaxWithheld" type="text" value={w2.socialSecurityTaxWithheld} onChange={handleChange} />
                        </Grid>
                        <Grid col={4}>
                            <Label htmlFor={`medicareTaxWithheld-${w2.id}`}>Medicare Tax Withheld</Label>
                            <TextInput id={`medicareTaxWithheld-${w2.id}`} name="medicareTaxWithheld" type="text" value={w2.medicareTaxWithheld} onChange={handleChange} />
                        </Grid>
                    </Grid>
                    <Button type="submit" className={styles.buttonSubmit}>Add W2 Form</Button>
                </GridContainer>
            </form>
            {w2s.length > 0 && (
                <div className={styles.listContainer}>
                    <h3>Existing W2 Forms</h3>
                    <ul>
                        {w2s.map((item) => (
                            <li key={item.id}>
                                {item.employer} - {item.year} - {item.wages}
                                <Button className={`${styles.actionButton}`} type="button" onClick={() => handleEdit(item.id)}>Edit</Button>
                                <Button className={`${styles.actionButton} ${styles.delete}`} type="button" onClick={() => handleDelete(item.id)}>Delete</Button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default W2Income;
