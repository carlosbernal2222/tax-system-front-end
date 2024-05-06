import React, { useState } from 'react';
import { Form, FormGroup, Label, TextInput, Button } from '@trussworks/react-uswds';

interface CreateW2FormProps {
    taxReturnId: number;
    onCreate: (form: FormW2) => void;
}

interface FormW2 {
    employerId: number;
    year: number;
    wages: number;
    federalIncomeTaxWithheld: number;
    socialSecurityTaxWithheld: number;
    medicareTaxWithheld: number;
    taxReturnId?: number; // Include this if the taxReturnId should be part of the form submission
}

const CreateW2Form: React.FC<CreateW2FormProps> = ({ taxReturnId, onCreate }) => {
    const [formW2, setFormW2] = useState<FormW2>({
        employerId: 0,
        year: new Date().getFullYear(),
        wages: 0,
        federalIncomeTaxWithheld: 0,
        socialSecurityTaxWithheld: 0,
        medicareTaxWithheld: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormW2({ ...formW2, [e.target.name]: parseFloat(e.target.value) });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate({
            ...formW2,
            taxReturnId: taxReturnId, // Passing taxReturnId as part of the form data if needed
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="employerId">Employer ID</Label>
                <TextInput id="employerId" name="employerId" type="number" value={formW2.employerId.toString()} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="year">Year</Label>
                <TextInput id="year" name="year" type="number" value={formW2.year.toString()} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="wages">Wages</Label>
                <TextInput id="wages" name="wages" type="number" value={formW2.wages.toString()} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="federalIncomeTaxWithheld">Federal Income Tax Withheld</Label>
                <TextInput id="federalIncomeTaxWithheld" name="federalIncomeTaxWithheld" type="number" value={formW2.federalIncomeTaxWithheld.toString()} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="socialSecurityTaxWithheld">Social Security Tax Withheld</Label>
                <TextInput id="socialSecurityTaxWithheld" name="socialSecurityTaxWithheld" type="number" value={formW2.socialSecurityTaxWithheld.toString()} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="medicareTaxWithheld">Medicare Tax Withheld</Label>
                <TextInput id="medicareTaxWithheld" name="medicareTaxWithheld" type="number" value={formW2.medicareTaxWithheld.toString()} onChange={handleChange} required />
            </FormGroup>
            <Button type="submit">Submit W2 Form</Button>
        </Form>
    );
};

export default CreateW2Form;
