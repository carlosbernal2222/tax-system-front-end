import React, { useState } from 'react';
import { Form, FormGroup, Label, TextInput, Button } from '@trussworks/react-uswds';
import {useTranslation} from 'react-i18next';

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
    
    /**
     * Represents the state of the 1099 form.
     */
    const [form1099, setForm1099] = useState<Form1099>({
        payer: '',
        year: new Date().getFullYear(),
        wages: 0,
    });
    const {t} = useTranslation();

    /**
     * Handles the change event for input fields.
     * Updates the form1099 state with the new values.
     * 
     * @param e - The change event object.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setForm1099({
            ...form1099,
            [name]: type === 'number' ? parseFloat(value) : value
        });
    };

    /**
     * Handles the form submission for creating a 1099 form.
     * 
     * @param {React.FormEvent} e - The form event.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate({
            ...form1099,
            taxReturnId: taxReturnId,        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="payer">{t('Payer')}</Label>
                <TextInput id="payer" name="payer" type="text" value={form1099.payer} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="year">{t('Year')}</Label>
                <TextInput id="year" name="year" type="number" value={form1099.year.toString()} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="wages">{t('Wages')}</Label>
                <TextInput id="wages" name="wages" type="number" value={form1099.wages.toString()} onChange={handleChange} required />
            </FormGroup>
            <Button type="submit">{t('Submit 1099 Form')}</Button>
        </Form>
    );

};

export default Create1099Form;
