import React, { useState } from 'react';
import { Form, FormGroup, Label, TextInput, Button } from '@trussworks/react-uswds';

interface Create1099FormProps {
    taxReturnId: number;
    onCreate: (form: Form1099) => void;
}

interface Form1099 {
    taxReturnId?: number;
    year: number;
    wages: number;
    payer: string;
}

const Create1099Form: React.FC<Create1099FormProps> = ({ taxReturnId, onCreate }) => {
    const [form1099, setForm1099] = useState<Form1099>({
        payer: '',
        year: new Date().getFullYear(),
        wages: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm1099({ ...form1099, [e.target.name]: parseFloat(e.target.value) });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate({
            ...form1099,
            taxReturnId: taxReturnId,  // Passing taxReturnId as part of the form data if needed
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="payer">Payer</Label>
                <TextInput id="payer" name="payer" type="text" value={form1099.payer.toString()} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="year">Year</Label>
                <TextInput id="year" name="year" type="number" value={form1099.year.toString()} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="wages">Wages</Label>
                <TextInput id="wages" name="wages" type="number" value={form1099.wages.toString()} onChange={handleChange} required />
            </FormGroup>
            <Button type="submit">Submit 1099 Form</Button>
        </Form>
    );
};

export default Create1099Form;
