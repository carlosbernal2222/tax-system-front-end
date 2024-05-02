import React, { useState, ChangeEvent, FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextInput, Label, Grid, GridContainer } from '@trussworks/react-uswds';
import styles from './SelfEmploymentIncome.module.css';

interface Form1099 {
    id: string;
    year: string;
    wages: string;
}

interface SelfEmploymentIncomeProps {
    taxReturnId: number;
}

const SelfEmploymentIncome: React.FC<SelfEmploymentIncomeProps> = ({ taxReturnId }) => {
    const [form1099s, setForm1099s] = useState<Form1099[]>([]);
    const [form1099, setForm1099] = useState<Form1099>({
        id: uuidv4(),
        year: '',
        wages: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm1099({ ...form1099, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitting Form 1099 for Tax Return ID:", taxReturnId, form1099);
        setForm1099s([...form1099s, form1099]);
        setForm1099({
            id: uuidv4(),
            year: '',
            wages: ''
        }); // Reset the form after submission
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <GridContainer className={styles.formGrid}>
                    <Grid row gap>
                        <Grid col={6} className={styles.inputField}>
                            <Label htmlFor={`year-${form1099.id}`} className={styles.label}>Year</Label>
                            <TextInput id={`year-${form1099.id}`} name="year" type="text" value={form1099.year} onChange={handleChange} className={styles.input} />
                        </Grid>
                        <Grid col={6} className={styles.inputField}>
                            <Label htmlFor={`wages-${form1099.id}`} className={styles.label}>Wages</Label>
                            <TextInput id={`wages-${form1099.id}`} name="wages" type="text" value={form1099.wages} onChange={handleChange} className={styles.input} />
                        </Grid>
                    </Grid>
                </GridContainer>
                <Button type="submit" className={styles.buttonSubmit}>Add Form 1099 Entry</Button>
            </form>
            {form1099s.length > 0 && (
                <div className={styles.listContainer}>
                    <h3>Existing Form 1099 Entries</h3>
                    <ul>
                        {form1099s.map((item, index) => (
                            <li key={item.id} className={index === form1099s.length - 1 ? styles.lastItem : styles.listItem}>
                                Year: {item.year}, Wages: ${item.wages}
                                {/* Implement edit/delete functionality if needed */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SelfEmploymentIncome;
