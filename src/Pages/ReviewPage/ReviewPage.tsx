import React, {useEffect, useRef, useState} from 'react';
import { Grid, GridContainer, Modal, ModalHeading, ModalFooter, Button } from '@trussworks/react-uswds';
import Update1099Form from "../../Components/Forms/Update1099Form.tsx";
import UpdateW2Form from "../../Components/Forms/UpdateW2Form.tsx";
import styles from './ReviewPage.module.css';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";


interface ReviewPageProps {
    taxReturnId: number;
}

interface Person{
    id?: number;
    ssn: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    address: string;
    phoneNumber: string;
}

interface FormW2{
    id: number;
    employer: Employer;
    year: number;
    wages: number;
    federalIncomeTaxWithheld: number;
    socialSecurityTaxWithheld: number;
    medicareTaxWithheld: number;
}
interface Form1099{
    id: number;
    payer: string;
    wages: number;
    year: number;
}

interface TaxReturn {
    id: number;
    year: number;
    filingStatus: string | null;
    completed: boolean;
    totalRefundDue: number | null;
}

interface Employer{
    id: number;
    ein: string;
    name: string;
    address: string;
}

const ReviewPage: React.FC<ReviewPageProps> = ({ taxReturnId }) => {

    const navigate = useNavigate();

    const [person, setPerson] = useState<Person | null>(null);

    const [currentTaxReturn, setCurrentTaxReturn] = useState<TaxReturn | null>(null);

    const [formW2s, setFormW2s] = useState<FormW2[]>([]);
    const [form1099s, setForm1099s] = useState<Form1099[]>([]);

    const [selected1099Form, setSelected1099Form] = useState<Form1099 | null>(null);
    const [selectedW2Form, setSelectedW2Form] = useState<FormW2 | null>(null);


    const modalRefW2 = useRef(null);
    const modalRef1099 = useRef(null);



    const { t } = useTranslation();

    useEffect(() => {
        fetchPersonData();
        fetchFormsData();
    }, [taxReturnId]);


    const fetchPersonData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/persons/${taxReturnId}/person`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch person data');
            }
            const data = await response.json();
            setPerson(data);

            const taxReturn = data.taxReturns.find(t => t.id === taxReturnId);
            if (taxReturn) {
                setCurrentTaxReturn(taxReturn);
            }
        } catch (error) {
            console.error('Error fetching person data:', error);
        }
    };
    const fetchFormsData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/returns/${taxReturnId}/forms`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch tax forms data');
            }
            const data = await response.json();
            setFormW2s(data.w2s);
            setForm1099s(data.form1099s);
        } catch (error) {
            console.error('Error fetching tax forms data:', error);
        }
    };


    const handleSubmit = async () => {
        try {
            // Fetch the tax due amount from the backend
            const response = await fetch(`http://localhost:8080/tax/calculate/${taxReturnId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to calculate tax due');
            }
            const taxDue = await response.json(); // Assuming the endpoint returns the tax due directly

            // Navigate to the result page with the tax due amount
            navigate(`/tax-filing/${taxReturnId}/result?amount=${taxDue.toFixed(2)}`, { replace: true });
        } catch (error) {
            console.error('Error calculating tax due:', error);
        }
    };

    const handleFormClick = (formType: 'W2' | '1099', formIndex: number) => {
        if (formType === '1099') {
            setSelected1099Form(form1099s[formIndex]);
            modalRef1099.current.toggleModal(true);
        } else {
            setSelectedW2Form(formW2s[formIndex]);
            modalRefW2.current.toggleModal(true);
        }
    };




    return (
        <GridContainer className={styles.container}>
            <Grid row gap>
                <Grid col={12}><h1>{t('Review Tax Return for ID')}: {taxReturnId}</h1></Grid>
            </Grid>
            <Grid row gap>
                <Grid col={6}>
                    <h2>{t('Personal Information')}</h2>
                    <p><strong>{t('Name')}:</strong> {person?.firstName} {person?.middleName} {person?.lastName}</p>
                    <p><strong>{t('SSN')}:</strong> {person?.ssn}</p>
                    <p><strong>{t('Date of Birth')}:</strong> {person?.dateOfBirth}</p>
                    <p><strong>{t('Phone')}:</strong> {person?.phoneNumber}</p>
                    <p><strong>{t('Address')}:</strong> {person?.address}</p>
                </Grid>
                <Grid col={6}>
                    <h2>{t('Tax Year and Filing Status')}</h2>
                    <p><strong>{t('Year')}:</strong> {currentTaxReturn?.year}</p>
                    <p><strong>{t('Status')}:</strong> {currentTaxReturn?.filingStatus}</p>
                </Grid>
            </Grid>
            <Grid row gap>
                <Grid col={6}>
                    <h2>{t('W2 Forms')}</h2>
                    {formW2s.length > 0 ? formW2s.map((w2, index) => (
                        <div key={w2.id} className={styles.formSection} onClick={() => handleFormClick('W2', index)}>
                            <h3>{t('W2 from')} {w2.employer.name}</h3>
                            <p><strong>{t('Wages')}:</strong> ${w2.wages.toLocaleString()}</p>
                            <p><strong>{t('Federal Income Tax Withheld')}:</strong> ${w2.federalIncomeTaxWithheld.toLocaleString()}</p>
                            <p><strong>{t('Social Security Tax Withheld')}:</strong> ${w2.socialSecurityTaxWithheld.toLocaleString()}</p>
                            <p><strong>{t('Medicare Tax Withheld')}:</strong> ${w2.medicareTaxWithheld.toLocaleString()}</p>
                        </div>
                    )) : <p>{t('No W2 forms available.')}</p>}
                </Grid>
                <Grid col={6}>
                    <h2>{t('1099 Forms')}</h2>
                    {form1099s.length > 0 ? form1099s.map((form1099, index) => (
                        <div key={form1099.id} className={styles.formSection} onClick={() => handleFormClick('1099', index)}>
                            <h3>{t('1099 from')} {form1099.payer}</h3>
                            <p><strong>{t('Amount')}:</strong> ${form1099.wages.toLocaleString()}</p>
                            <p><strong>{t('Year')}:</strong> {form1099.year}</p>
                        </div>
                    )) : <p>{t('No 1099 forms available.')}</p>}
                </Grid>
            </Grid>
            <div className={styles.buttonContainer}>
                <button onClick={handleSubmit} className="usa-button">{t('Submit Tax Return')}</button>
            </div>
            <Modal ref={modalRefW2} id="edit-w2-modal" aria-labelledby="edit-w2-modal-heading" aria-describedby="edit-w2-modal-description">
                <ModalHeading id="edit-w2-modal-heading">{t('Edit W2 Information')}</ModalHeading>
                <div className="usa-prose" id="edit-w2-modal-description">
                    {selectedW2Form && <UpdateW2Form formW2Id={selectedW2Form.id}  />}
                </div>
                <ModalFooter>
                    <Button type="button" onClick={() => modalRefW2.current.toggleModal(false)}>{t('Close')}</Button>
                </ModalFooter>
            </Modal>

            <Modal ref={modalRef1099} id="edit-1099-modal" aria-labelledby="edit-1099-modal-heading" aria-describedby="edit-1099-modal-description">
                <ModalHeading id="edit-1099-modal-heading">Edit Self Employment Info</ModalHeading>
                <div className="usa-prose" id="edit-1099-modal-description">
                    {selected1099Form && <Update1099Form form1099Id={selected1099Form.id} />}
                </div>
                <ModalFooter>
                    <Button type={"submit"} onClick={() => modalRef1099.current.toggleModal(false)}>Close</Button>
                </ModalFooter>
            </Modal>



        </GridContainer>
    );

};

export default ReviewPage;
