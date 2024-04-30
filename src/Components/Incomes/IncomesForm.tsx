import React, { useState } from 'react';
import { Button, GridContainer } from '@trussworks/react-uswds';
import W2FormDisplay from "../TaxForms/W2FormDisplay.tsx";
import Form1099Display from "../TaxForms/Form1099Display.tsx";

interface Form {
    type: 'W-2' | '1099';
    employer?: string;
    wage?: string;
    withheld?: string;
    client?: string;
    amount?: string;
}

const IncomeForms: React.FC = () => {
    const [isIncomesExpanded, setIsIncomesExpanded] = useState(false);
    const [isW2Expanded, setIsW2Expanded] = useState(false);
    const [is1099Expanded, setIs1099Expanded] = useState(false);

    const [formsData, setFormsData] = useState<Form[]>([
        {
            type: 'W-2',
            employer: 'ABC Corp',
            wage: '$50,000',
            withheld: '$5,000'
        },
        {
            type: '1099',
            client: 'XYZ LLC',
            amount: '$10,000'
        }
    ]);

    const toggleIncomesAccordion = () => {
        setIsIncomesExpanded(!isIncomesExpanded);
        // Reset sub-accordions when main accordion is closed
        if (!isIncomesExpanded) {
            setIsW2Expanded(false);
            setIs1099Expanded(false);
        }
    };

    const addNewW2 = () => {
        const newW2: Form = {
            type: 'W-2',
            employer: 'New Employer',
            wage: '$60,000',
            withheld: '$6,000'
        };
        setFormsData([...formsData, newW2]);
    };

    const addNew1099 = () => {
        const new1099: Form = {
            type: '1099',
            client: 'New Client',
            amount: '$12,000'
        };
        setFormsData([...formsData, new1099]);
    };

    return (
        <div className="usa-accordion">
            <h2 className="usa-accordion__heading">
                <button
                    className="usa-accordion__button"
                    aria-expanded={isIncomesExpanded}
                    onClick={toggleIncomesAccordion}
                >
                    Incomes
                </button>
            </h2>
            <div hidden={!isIncomesExpanded}>
                <div className="usa-accordion">
                    <h3 className="usa-accordion__heading">
                        <button
                            className="usa-accordion__button"
                            aria-expanded={isW2Expanded}
                            onClick={() => setIsW2Expanded(!isW2Expanded)}
                        >
                            W-2 Forms
                        </button>
                    </h3>
                    <div hidden={!isW2Expanded}>
                        <GridContainer>
                            {formsData.filter(form => form.type === 'W-2').map((form, index) =>
                                <W2FormDisplay key={index} form={form} />
                            )}
                            <Button type="button" outline onClick={addNewW2}>Add W-2</Button>
                        </GridContainer>
                    </div>
                </div>
                <div className="usa-accordion">
                    <h3 className="usa-accordion__heading">
                        <button
                            className="usa-accordion__button"
                            aria-expanded={is1099Expanded}
                            onClick={() => setIs1099Expanded(!is1099Expanded)}
                        >
                            1099 Forms
                        </button>
                    </h3>
                    <div hidden={!is1099Expanded}>
                        <GridContainer>
                            {formsData.filter(form => form.type === '1099').map((form, index) =>
                                <Form1099Display key={index} form={form} />
                            )}
                            <Button type="button" secondary onClick={addNew1099}>Add 1099</Button>
                        </GridContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncomeForms;
