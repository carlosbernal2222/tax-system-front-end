import React, { useState } from 'react';
import { Button, TextInput, Label, Grid, GridContainer } from '@trussworks/react-uswds';
import styles from './PersonalInformation.module.css'; // Ensure this CSS module is correctly linked for styling

const PersonalInformation: React.FC = () => {
    const [person, setPerson] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        ssn: '',
        address: '',
        phoneNumber: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPerson({ ...person, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Personal Information Submitted:", person);
        // Here you might want to call an API or handle the data in some way
    };

    return (
        <div className={styles.container}>
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
                            <TextInput id="telephone" name="telephone" type="tel" value={person.phoneNumber} onChange={handleChange} />
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
