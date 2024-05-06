import React, {useState} from 'react';
import Create1099Form from '../../Components/Forms/Create1099Form.tsx';
import Form1099List from "../../Components/FormLists/Form1099List.tsx";

interface SelfEmploymentIncomeProps {
    taxReturnId: number;
}

interface Form1099 {
    year: number;
    wages: number;
    payer: string;
    taxReturnId?: number;  // Foreign key to TaxReturn, assuming you need this in the frontend for linking
}


const SelfEmploymentIncome: React.FC<SelfEmploymentIncomeProps> = ({ taxReturnId }) => {
    const [refresh, setRefresh] = useState(false);

    const handleCreateForm = async (form: Form1099) => {
        try {
            const response = await fetch('http://localhost:8080/form1099s', {
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
                throw new Error('Failed to create Form 1099');
            }

            await response.json();
            alert('Form 1099 created successfully!');
            setRefresh(!refresh); // Trigger a refresh of the list
        } catch (error) {
            console.error('Error creating Form 1099:', error);
            alert('Error creating Form 1099. Please try again.');
        }
    };

    return (
        <div>
            <h2>Self Employment Income for Tax Return ID: {taxReturnId}</h2>
            <Create1099Form taxReturnId={taxReturnId} onCreate={handleCreateForm} />
            <Form1099List taxReturnId={taxReturnId} refresh={refresh} />
        </div>
    );
};

export default SelfEmploymentIncome;
