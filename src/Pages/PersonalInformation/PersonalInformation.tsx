
import React, { useEffect, useState } from 'react';
import { Button, TextInput, Label, Grid, GridContainer, Alert } from '@trussworks/react-uswds';
import styles from './PersonalInformation.module.css';

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
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ taxReturnId }) => {
    const [person, setPerson] = useState<Person>({
        ssn: '',
        firstName: '',
        middleName: '',
        lastName: '',
        address: '',
        phoneNumber: ''
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
                setPerson(data);
            } catch (error) {
                console.error('Error fetching person data:', error);
            }
        };
        fetchPersonData();
    }, [taxReturnId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPerson({ ...person, [e.target.name]: e.target.value });
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

    console.log(person);

    return (
        <div className={styles.container}>
            {showSuccessMessage && (
                <Alert type="success" className="margin-bottom-4" headingLevel={"h2"}>
                    Personal information updated successfully!
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <GridContainer className={styles.formGrid}>
                    <Grid row gap>
                        <Grid col={4}>
                            <Label htmlFor="firstName">First Name</Label>
                            <TextInput id="firstName" name="firstName" type="text" value={person.firstName} onChange={handleChange} />
                        </Grid>
                        <Grid col={4}>
                            <Label htmlFor="middleName">Middle Name (Optional)</Label>
                            <TextInput id="middleName" name="middleName" type="text" value={person.middleName} onChange={handleChange} />
                        </Grid>
                        <Grid col={4}>
                            <Label htmlFor="lastName">Last Name</Label>
                            <TextInput id="lastName" name="lastName" type="text" value={person.lastName} onChange={handleChange} />
                        </Grid>
                    </Grid>
                    <Grid row gap>
                        <Grid col={4}>
                            <Label htmlFor="ssn">Social Security Number</Label>
                            <TextInput id="ssn" name="ssn" type="text" value={person.ssn} onChange={handleChange} />
                        </Grid>
                        <Grid col={4}>
                            <Label htmlFor="address">Address</Label>
                            <TextInput id="address" name="address" type="text" value={person.address} onChange={handleChange} />
                        </Grid>
                        <Grid col={4}>
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <TextInput id="telephone" name="phoneNumber" type="tel" value={person.phoneNumber} onChange={handleChange} />
                        </Grid>
                    </Grid>
                </GridContainer>
                <div className={styles.buttonContainer}>
                    <Button type="submit" className={styles.buttonSubmit}>Save Personal Information</Button>
                </div>
            </form>
        </div>
    );
};

export default PersonalInformation;
