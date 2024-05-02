import React from 'react';
import { GridContainer, Grid } from '@trussworks/react-uswds';
import logo from '../../assets/react-logo.svg';

const FooterComponent: React.FC = () => {
  return (
    <footer className="usa-footer">
      <div className="usa-footer__secondary-section">
        <GridContainer>
          <Grid row gap>
            <div className="usa-footer__logo grid-row mobile-lg:grid-col-6">
              <div className='usa-identifier__logos'>
                 <img src={logo} className="usa-footer__logo-img" alt="Agency Logo" />
              </div>
              <section className='usa-identifier__identity' aria-label='Agency Description'>
                <p className='usa-identifier__identity-domain'>google.com</p>
                <p className='usa-identifier__identity-disclaimer'>
                  "An official website of the United States government developed by SkillStorm."
                </p>
              </section>
            </div>
            <div className="usa-footer__contact-links mobile-lg:grid-col-6">
              <address className="usa-footer__address">
                <div className="usa-footer__contact-info grid-row">
                  <a href="/help/" className="usa-link">Help</a>
                  <span> | </span>
                  <a href="/contact/" className="usa-link">Contact Us</a>
                </div>
              </address>
            </div>
          </Grid>
        </GridContainer>
      </div>
    </footer>
  );
};

export default FooterComponent;
