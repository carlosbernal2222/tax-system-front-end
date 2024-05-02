import React from 'react';
import { GridContainer } from '@trussworks/react-uswds';
import './HeroComponent.css';
import img from '../../assets/hero-img.png';

const HeroComponent: React.FC = () => {
  return (
    <section className="usa-hero custom-hero" aria-label="Introduction">
      <GridContainer>
        <div className="usa-hero__callout">
          <h1 className="usa-hero__heading">
            <span className="usa-hero__heading--alt">File Your Taxes with Ease:</span>
            Seamless Online Tax Preparation
          </h1>
          <p>
            Skip the stress of tax season with our straightforward digital tools designed to guide you through each step. Whether you're filing as an individual or for your business, we make it easy so you can focus on what matters most.
          </p>
          <a className="usa-button" href="/join-us">
            Join Us
          </a>
        </div>
        <div className="usa-hero__image">
          <img src={img} alt="Tax preparation" />
        </div>
      </GridContainer>
    </section>
  );
};

export default HeroComponent;
