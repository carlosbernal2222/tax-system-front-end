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
    const [form1099, setForm1099] = useState<Form1099>({
        payer: '',
        year: new Date().getFullYear(),
        wages: 0,
    });
    const {t} = useTranslation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setForm1099({
            ...form1099,
            [name]: type === 'number' ? parseFloat(value) : value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate({
            ...form1099,
            taxReturnId: taxReturnId,  // Ensure taxReturnId is passed correctly if required
        });
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
