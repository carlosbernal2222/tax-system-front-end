import React, { useState } from 'react';
import { Form, FormGroup, Label, TextInput, Button, Grid, GridContainer } from '@trussworks/react-uswds';
import styles from './CreateW2Form.module.css';
import {useTranslation} from 'react-i18next';
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
    taxReturnId?: number; 
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

    const {t} = useTranslation();

    /**
     * Handles the change event for input fields in the CreateW2Form component.
     * Updates the corresponding value in the formW2 state object.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Prevent negative values
        const parsedValue = parseFloat(value);
        const nonNegativeValue = parsedValue < 0 ? 0 : parsedValue;

        setFormW2({ ...formW2, [name]: nonNegativeValue });
    };


    /**
     * Handles the form submission for creating a W2 form.
     * 
     * @param {React.FormEvent} e - The form event object.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate({
            ...formW2,
            taxReturnId: taxReturnId, // Passing taxReturnId as part of the form data if needed
        });
    };

    return (
        <Form onSubmit={handleSubmit} large={true}>
            <GridContainer className={styles.fullWidthContainer}>
                <Grid row gap>
                    <Grid col={6}>
                        <FormGroup>
                            <Label htmlFor="employerId">{t('Employer ID')}</Label>
                            <TextInput id="employerId" name="employerId" type="number" value={formW2.employerId.toString()} onChange={handleChange} required min={"1"} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="year">{t('Year')}</Label>
                            <TextInput id="year" name="year" type="number" value={formW2.year.toString()} onChange={handleChange} required />
                        </FormGroup>
                    </Grid>
                    <Grid col={6}>
                        <FormGroup>
                            <Label htmlFor="wages">{t('Wages')}</Label>
                            <TextInput id="wages" name="wages" type="number" value={formW2.wages.toString()} onChange={handleChange} required min={"0"} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="federalIncomeTaxWithheld">{t('Federal Tax Withheld')}</Label>
                            <TextInput id="federalIncomeTaxWithheld" name="federalIncomeTaxWithheld" type="number" value={formW2.federalIncomeTaxWithheld.toString()} onChange={handleChange} required min={"0"}/>
                        </FormGroup>
                    </Grid>
                    <Grid col={12}>
                        <FormGroup>
                            <Label htmlFor="socialSecurityTaxWithheld">{t('Social Security Tax Withheld')}</Label>
                            <TextInput id="socialSecurityTaxWithheld" name="socialSecurityTaxWithheld" type="number" value={formW2.socialSecurityTaxWithheld.toString()} onChange={handleChange} required min={"0"} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="medicareTaxWithheld">{t('Medicare Tax Withheld')}</Label>
                            <TextInput id="medicareTaxWithheld" name="medicareTaxWithheld" type="number" value={formW2.medicareTaxWithheld.toString()} onChange={handleChange} required min={"0"}/>
                        </FormGroup>
                    </Grid>
                </Grid>
                <div className={styles.submitButtonContainer}>
                    <Button type="submit" className={"usa-button"}>{t('Submit W2 Form')}</Button>
                </div>
            </GridContainer>
        </Form>
    );

};

export default CreateW2Form;
