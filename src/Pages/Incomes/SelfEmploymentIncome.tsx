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
        setForm1099s(prevForms => [...prevForms, { ...form1099, id: uuidv4() }]); // Simulate adding a new Form 1099
        resetForm();
    };

    const handleEdit = (id: string) => {
        const formToEdit = form1099s.find(item => item.id === id);
        if (formToEdit) {
            setForm1099({ ...formToEdit }); // Load the Form 1099 data into the form for editing
        }
    };

    const handleDelete = (id: string) => {
        setForm1099s(form1099s.filter(item => item.id !== id)); // Simulate deleting a Form 1099
    };

    const resetForm = () => {
        setForm1099({
            id: uuidv4(), // Ensure a new ID is generated for the next form submission
            year: '',
            wages: ''
        });
    };

    // Mock fetching Form 1099s (would replace this with an API call normally)
    const fetchForm1099s = () => {
        // Here we simulate fetching by using the state directly
        console.log("Fetched Form 1099s:", form1099s);
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
                <div className={styles.buttonContainer}>
                    <Button type="submit" className={styles.buttonSubmit}>Entry 1099</Button>
                </div>
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
