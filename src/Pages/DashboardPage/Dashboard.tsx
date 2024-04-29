import React from 'react';
import TaxReturnTable from '../../Components/TaxReturnTable/TaxReturnTable';
import { Button } from '@trussworks/react-uswds';

const taxReturns = [
    {
        id: 1,
        year: 2020,
        filingStatus: 'Single',
        amount: 1000,
    },
    {
        id: 2,
        year: 2020,
        filingStatus: 'Married',
        amount: 2000,
    },
    
];

const Dashboard: React.FC = () => {

    const handleStartNewReturn = () => {
    console.log('Starting new tax return process...'); // Replace with your actual function
    };

    return (
        <div>
            <h1>Dashboard Page</h1>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center',
            }}>
                <Button 
                    className='bg-primary text-white'
                    type="button"
                    onClick={handleStartNewReturn} 
                    outline={true} 
                >
                    File Tax
                </Button>
            </div>
            <TaxReturnTable taxReturns={taxReturns} />
        </div>
    );
};

export default Dashboard;