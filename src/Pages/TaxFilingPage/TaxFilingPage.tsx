
import React from 'react';
import {Routes, Route, useLocation, useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import styles from './TaxFilingPage.module.css';
import PersonalInformation from '../PersonalInformation/PersonalInformation';
import W2Income from '../Incomes/W2Income';
import SelfEmploymentIncome from '../Incomes/SelfEmploymentIncome';
import ReviewPage from '../ReviewPage/ReviewPage';
import ResultPage from '../ResultsPage/ResultsPage';

const TaxFilingPage: React.FC = () => {
    const { id } = useParams(); // Get tax return ID from the URL
    const taxReturnId:number = Number(id);
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const steps = [
        { path: 'personal-information', component: <PersonalInformation taxReturnId={taxReturnId} />, label: 'Personal Information' },
        { path: 'w2-income', component: <W2Income taxReturnId={taxReturnId} />, label: 'W2 Income' },
        { path: 'self-employment-income', component: <SelfEmploymentIncome taxReturnId={taxReturnId} />, label: 'Self Employment Income' },
        { path: 'review', component: <ReviewPage taxReturnId={taxReturnId} />, label: 'Review' },
        { path: 'result', component: <ResultPage  />, label: 'Result' }
    ];

    const currentStepIndex = steps.findIndex(step => location.pathname.includes(step.path));

    // Modify goToNextStep to prevent navigation on the last informational step
    const goToNextStep = () => {
        if (currentStepIndex < steps.length - 2) { // Adjust index to stop before 'result' step
            navigate(steps[currentStepIndex + 1].path);
        }
    };

    const goToPreviousStep = () => {
        if (currentStepIndex > 0) {
            navigate(steps[currentStepIndex - 1].path);
        }
    };

    return (
        <div className={styles.taxFilingContainer}>
            <h1>{t('Tax Filing')}</h1>
            <div className={styles.stepIndicator} aria-label="progress">
                <ol className="usa-step-indicator__segments">
                    {steps.map((step, index) => (
                        <li key={index}
                            className={`usa-step-indicator__segment ${index < currentStepIndex ? 'usa-step-indicator__segment--complete' : ''} ${index === currentStepIndex ? 'usa-step-indicator__segment--current' : ''}`}
                            aria-current={index === currentStepIndex ? "true" : undefined}>
                            <span className="usa-step-indicator__segment-label">
                                {step.label}
                                <span className="usa-sr-only">{index <= currentStepIndex ? t('completed') : t('not completed')}</span>
                            </span>
                        </li>
                    ))}
                </ol>
                <div className="usa-step-indicator__header">
                    <h4 className="usa-step-indicator__heading">
                        <span className="usa-step-indicator__heading-counter">
                            <span className="usa-sr-only">{t('Step')}</span>
                            <span className="usa-step-indicator__current-step">{currentStepIndex + 1}</span>
                            <span className="usa-step-indicator__total-steps">{t('of')} {steps.length}</span>
                        </span>
                        <span className="usa-step-indicator__heading-text">{steps[currentStepIndex].label}</span>
                    </h4>
                </div>
            </div>
            <Routes>
                {steps.map((step, index) => (
                    <Route key={index} path={step.path} element={step.component} />
                ))}
                <Route index element={<PersonalInformation taxReturnId={taxReturnId}/>} />
            </Routes>
            <div className="navigation-buttons">
                {currentStepIndex > 0 && (
                    <button onClick={goToPreviousStep} className="usa-button">{t('Back')}</button>
                )}
                {currentStepIndex < steps.length - 2 && (
                    <button onClick={goToNextStep} className="usa-button">{t('Next')}</button>
                )}
            </div>
        </div>
    );
};

export default TaxFilingPage;
