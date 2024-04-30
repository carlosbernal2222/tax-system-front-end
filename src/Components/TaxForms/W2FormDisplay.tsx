import React from 'react';

interface W2Form {
    type: 'W-2';
    employer: string;
    wage: string;
    withheld: string;
}
const W2FormDisplay: React.FC<{ form: W2Form }> = ({ form }) => {
    return (
        <div>
            <strong>Employer:</strong> {form.employer}<br/>
            <strong>Wage:</strong> {form.wage}<br/>
            <strong>Tax Withheld:</strong> {form.withheld}<br/>
        </div>
    );
};

export default W2FormDisplay;