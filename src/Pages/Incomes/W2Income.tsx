import React, { useState } from 'react';
import CreateW2Form from '../../Components/Forms/CreateW2Form.tsx';
import W2List from '../../Components/FormLists/W2List.tsx';

interface W2IncomeProps {
    taxReturnId: number;
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

const W2Income: React.FC<W2IncomeProps> = ({ taxReturnId }) => {
    const [refresh, setRefresh] = useState<boolean>(false); // State to trigger refresh

    const handleCreateForm = async (form: FormW2) => {
        try {
            const response = await fetch('http://localhost:8080/w2s', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                    taxReturnId: taxReturnId,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create W2 form');
            }

            const result = await response.json();
            console.log('Form created successfully:', result);
            alert('W2 form created successfully!');
            setRefresh(!refresh); // Toggle refresh state to trigger an update in the W2 list
        } catch (error) {
            console.error('Error creating W2 form:', error);
            alert('Error creating W2 form. Please try again.');
        }
    };

    return (
        <div>
            <h2>W2 Income for Tax Return ID: {taxReturnId}</h2>
            <CreateW2Form taxReturnId={taxReturnId} onCreate={handleCreateForm} />
            <W2List taxReturnId={taxReturnId} refresh={refresh} />
        </div>
    );
};

export default W2Income;
