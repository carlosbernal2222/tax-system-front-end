// src/components/Dashboard.tsx

import React, { useState } from 'react';
import { Button } from '@trussworks/react-uswds';
import styles from './Dashboard.module.css';

interface TaxFiling {
    id: number;
    year: number;
    status: string;
    returnedAmount?: number | null;
}

const Dashboard: React.FC = () => {
    const [filings, setFilings] = useState<TaxFiling[]>([
        { id: 1, year: 2021, status: 'Completed', returnedAmount: 1200 },
        { id: 2, year: 2022, status: 'In Progress', returnedAmount: null },
    ]);

    const handleStartNewFiling = () => {
        console.log("Starting new filing process...");
    };

    const handleContinueFiling = (id: number) => {
        console.log(`Continuing filing for ID ${id}`);
    };

    return (
        <div className={styles.dashboardContainer}>
            <h1 className="usa-header">Tax Filings Dashboard</h1>
            <Button type="button" onClick={handleStartNewFiling} className={`usa-button ${styles.buttonNewFiling}`}>
                Start New Filing
            </Button>
            <table className={`usa-table usa-table--bordered ${styles.dashboardTable}`}>
                <caption>Bordered Tax Filing Table</caption>
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Year</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {filings.map((filing) => (
                    <tr key={filing.id}>
                        <th scope="row">{filing.id}</th>
                        <td>{filing.year}</td>
                        <td>{filing.status}</td>
                        <td>
                            {filing.status === 'Completed' ? (
                                `Returned: $${filing.returnedAmount}`
                            ) : (
                                <Button type='button' onClick={() => handleContinueFiling(filing.id)} className="usa-button usa-button--secondary">
                                    Continue Filing
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
