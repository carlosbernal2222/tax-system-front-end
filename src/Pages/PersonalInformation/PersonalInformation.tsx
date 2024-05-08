
import React, { useEffect, useState } from 'react';
import {Button, TextInput, Label, Grid, GridContainer, Alert, Radio, DatePicker} from '@trussworks/react-uswds';
import styles from './PersonalInformation.module.css';
import {useTranslation} from 'react-i18next';

interface PersonalInformationProps {
    taxReturnId: number;
}

interface Person {
    id?: number;
    ssn: string;
    firstName: string;
    middleName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    dateOfBirth?: string; // New date field
    taxReturns: TaxReturn[];
}

interface TaxReturn {
    id: number;
    year: number;
    filingStatus: string | null;
    completed: boolean;
    totalRefundDue: number | null;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ taxReturnId }) => {
    const [person, setPerson] = useState<Person>({
        ssn: '',
        firstName: '',
        middleName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        dateOfBirth: '',
        taxReturns: []
    });

    const [filingStatus, setFilingStatus] = useState<string>('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const { t } = useTranslation();

    console.log(filingStatus)
    console.log(person)

    // Fetch person data on mount
    useEffect(() => {
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
                const data: Person = await response.json();
                
                if (data.dateOfBirth) {
                    const formattedDate = new Date(data.dateOfBirth).toISOString().split('T')[0];
                    data.dateOfBirth = formattedDate;
                }
                setPerson(data);

                const taxReturn = data.taxReturns.find(tr => tr.id === taxReturnId);
                if (taxReturn && taxReturn.filingStatus) {
                    setFilingStatus(taxReturn.filingStatus); // Set the filing status in state
                }
            } catch (error) {
                console.error('Error fetching person data:', error);
            }
        };
        fetchPersonData();
    }, [taxReturnId]);

    useEffect(() => {
        if (filingStatus) {  // Make sure there's a filing status selected
            handleFilingStatusUpdate();
        }
    }, [filingStatus]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'filingStatus') {
            setFilingStatus(e.target.value);
        } else {
            setPerson({ ...person, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!person.id) {
            console.error('No person ID available for update');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/persons/person/${person.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(person)
            });
            if (!response.ok) {
                throw new Error('Failed to update person data');
            }
            console.log("Personal information updated successfully!");
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 5000); // hide success message after 5 seconds
        } catch (error) {
            console.error('Error updating personal information:', error);
        }
    };

    const handleFilingStatusUpdate = async () => {
        // Create the complete tax return object with the current filing status
        const taxReturnUpdate = {
            id: taxReturnId, // Ensure the ID is included if it's required to construct the TaxReturn object
            filingStatus: filingStatus
        };

        try {
            const response = await fetch(`http://localhost:8080/returns/${taxReturnId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(taxReturnUpdate)
            });
            if (!response.ok) {
                throw new Error('Failed to update filing status');
            }
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 5000);
        } catch (error) {
            console.error('Error updating filing status:', error);
        }
    };

    const handleDateChange = (dateValue?: string) => {
        setPerson({ ...person, dateOfBirth: dateValue || '' });
    };


    return (
        <div className={styles.container}>
            {showSuccessMessage && (
                <Alert type="success" className="margin-bottom-4" headingLevel={"h2"}>
                    {t('Personal information updated successfully!')}
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <GridContainer className={styles.formGrid}>
                    <Grid row gap>
                        <Grid col={2}>
                            <Label htmlFor="firstName">{t('First Name')}</Label>
                            <TextInput id="firstName" name="firstName" type="text" value={person.firstName} onChange={handleChange} />
                        </Grid>
                        <Grid col={2}>
                            <Label htmlFor="middleName">{t('Middle Name')}</Label>
                            <TextInput id="middleName" name="middleName" type="text" value={person.middleName} onChange={handleChange} />
                        </Grid>
                        <Grid col={4}>
                            <Label htmlFor="lastName">{t('Last Name')}</Label>
                            <TextInput id="lastName" name="lastName" type="text" value={person.lastName} onChange={handleChange} />
                        </Grid>
                        <Grid col={4}>
                            <Label htmlFor="dateOfBirth" hint={"mm/dd/yyyy"}>{t('Date of Birth')} </Label>
                            {/*<div className="usa-date-picker">*/}
                            {/*    <input*/}
                            {/*        className="usa-input"*/}
                            {/*        id="dateOfBirth"*/}
                            {/*        name="dateOfBirth"*/}
                            {/*        type="text"*/}
                            {/*        value={person.dateOfBirth}*/}
                            {/*        onChange={handleChange}*/}
                            {/*        aria-labelledby="dateOfBirth-label"*/}
                            {/*        aria-describedby="dateOfBirth-hint"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <DatePicker
                                id="dateOfBirth"
                                name="dateOfBirth"
                                type="text"
                                value={person.dateOfBirth}
                                onChange={handleDateChange} // Use the new handler here
                            />
                        </Grid>
                        
                    </Grid>
                    <Grid row gap>
                        <Grid col={4}>
                            <Label htmlFor="ssn">{t('Social Security Number')}</Label>
                            <TextInput id="ssn" name="ssn" type="text" value={person.ssn} onChange={handleChange} />
                        </Grid>
                        <Grid col={5}>
                            <Label htmlFor="address">{t('Address')}</Label>
                            <TextInput id="address" name="address" type="text" value={person.address} onChange={handleChange} />
                        </Grid>
                        <Grid col={3}>
                            <Label htmlFor="phoneNumber">{t('Phone Number')}</Label>
                            <TextInput id="telephone" name="phoneNumber" type="tel" value={person.phoneNumber} onChange={handleChange} />
                        </Grid>
                    </Grid>
                </GridContainer>
                <div className={styles.buttonContainer}>
                    <Button type="submit" className={styles.buttonSubmit}>{t('Save Personal Information')}</Button>
                </div>
            </form>
            <div className="filing-status-section">
                <h3>{t('Filing Status')}</h3>
                <Radio id="single" name="filingStatus" label={t('Single')} value="Single" checked={filingStatus === "Single"} onChange={handleChange} />
                <Radio id="jointly" name="filingStatus" label={t('Jointly')} value="Jointly" checked={filingStatus === "Jointly"} onChange={handleChange} />
            </div>
        </div>
    );

};

export default PersonalInformation;
