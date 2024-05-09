import React from 'react';
import { useTranslation } from 'react-i18next';
import { GridContainer } from '@trussworks/react-uswds';
import './HeroComponent.css';
import img from '../../assets/hero-img.png';

const HeroComponent: React.FC = () => {
  const { t } = useTranslation();

  const handleLogin = () => {
    // Check if the timeout is already set
    if (!localStorage.getItem('isLoggedInTimeout')) {
      localStorage.setItem('isLoggedIn', 'true');
    }

    window.location.replace("http://localhost:8080/users/signin");
  };

  return (
      <section className="usa-hero custom-hero" aria-label={t('Introduction')}>
        <GridContainer>
          <div className="usa-hero__callout">
            <h1 className="usa-hero__heading">
              <span className="usa-hero__heading--alt">{t('File Your Taxes with Ease')}:</span>
              {t('Seamless Online Tax Preparation')}
            </h1>
            <p>
              {t('Skip the stress of tax season with our straightforward digital tools designed to guide you through each step. Whether you\'re filing as an individual or for your business, we make it easy so you can focus on what matters most.')}
            </p>
            <a className="usa-button"  onClick={handleLogin}>
              {t('Join Us')}
            </a>
          </div>
          <div className="usa-hero__image">
            <img src={img} alt={t('Tax preparation')} />
          </div>
        </GridContainer>
      </section>
  );
};

export default HeroComponent;
