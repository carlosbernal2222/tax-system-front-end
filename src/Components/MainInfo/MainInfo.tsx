import React from 'react';
const MainInfo: React.FC = () => {
    
    const[isExpanded, setIsExpanded] = React.useState(false);
    
    const[formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        middleName: '',
        dob: '',
        address: '',
        email: '',
        ssn: '',
        phone: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Add form submission logic here
    };

    return (
        <div className="usa-accordion">
            <h4 className="usa-accordion__heading">
                <button
                    className="usa-accordion__button"
                    aria-expanded={isExpanded}
                    aria-controls="main-info-form"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    Main Info
                </button>
            </h4>
            <div id="main-info-form" className="usa-accordion__content usa-prose" hidden={!isExpanded}>
                <form onSubmit={handleSubmit}>
                    <fieldset className="usa-fieldset">
                        <legend className="usa-legend">Personal Information</legend>
                        <label htmlFor="full-name" className="usa-label">Full Name</label>
                        <input
                            id="full-name"
                            name="fullName"
                            type="text"
                            className="usa-input"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="middle-name" className="usa-label">Middle Name</label>
                        <input
                            id="middle-name"
                            name="middleName"
                            type="text"
                            className="usa-input"
                            value={formData.middleName}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="last-name" className="usa-label">Last Name</label>
                        <input
                            id="last-name"
                            name="lastName"
                            type="text"
                            className="usa-input"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="ssn" className="usa-label">Social Security Number (SSN)</label>
                        <input
                            id="ssn"
                            name="ssn"
                            type="text"
                            className="usa-input"
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}"
                            required
                            title="SSN format: 123-45-6789"
                            value={formData.ssn}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="dob" className="usa-label">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            className="usa-input"
                            required
                            value={formData.dob}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="email" className="usa-label">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="usa-input"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="phone" className="usa-label">Phone Number</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            className="usa-input"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            required
                            title="Phone format: 123-456-7890"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="address" className="usa-label">Address</label>
                        <textarea
                            id="address"
                            name="address"
                            className="usa-textarea"
                            required
                            value={formData.address}
                            onChange={handleInputChange}
                        />

                        <button type="submit" className="usa-button">Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default MainInfo;