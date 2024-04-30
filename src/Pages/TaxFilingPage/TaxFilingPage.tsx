import React from 'react';
import MainInfo from '../../Components/MainInfo/MainInfo.tsx';
import IncomesForm from "../../Components/Incomes/IncomesForm.tsx";

const TaxFilingPage: React.FC = () => {
    return (
        <div>
            <h1>Tax Filing Page</h1>
            <MainInfo/>
            <IncomesForm/>
        </div>
    );
};

export default TaxFilingPage;