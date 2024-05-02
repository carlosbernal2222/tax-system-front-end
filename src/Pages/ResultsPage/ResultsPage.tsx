import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '@trussworks/react-uswds';

const ResultsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const amount = parseFloat(queryParams.get('amount') || '0');

    // Determine if it's a refund or tax due based on the amount
    const isRefund = amount < 0;
    const displayAmount = Math.abs(amount).toFixed(2);

    // Function to handle navigation back to the dashboard
    const navigateToDashboard = () => {
        navigate('/dashboard'); // Adjust this path as necessary for your application
    };

    return (
        <div>
            <h1>Results Page</h1>
            <Card>
                <CardHeader>
                    <h2>{isRefund ? 'Tax Refund' : 'Tax Due'}</h2>
                </CardHeader>
                <CardBody>
                    <p>The calculated {isRefund ? 'refund' : 'tax due'} is:</p>
                    <strong>${displayAmount}</strong>
                    <div style={{ marginTop: '20px' }}>
                        <button onClick={navigateToDashboard} className="usa-button">
                            Back to Dashboard
                        </button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default ResultsPage;
