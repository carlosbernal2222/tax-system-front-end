import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header, Title, NavMenuButton, PrimaryNav, Menu, NavDropDownButton } from '@trussworks/react-uswds';
import { Link } from 'react-router-dom';

const HeaderComponent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const onClick = (): void => setExpanded(prevExpanded => !prevExpanded);

  const [isOpen, setIsOpen] = useState([false, false]);
  const handleToggle = (index: number) => {
    setIsOpen(prevIsOpen => {
      const newIsOpen = [...prevIsOpen];
      newIsOpen[index] = !prevIsOpen[index];
      return newIsOpen;
    });
  };

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('es') ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const currentLangLabel = i18n.language.startsWith('es') ? t('English') : t('Español');

  const menuItems = [
    <a href="/" key="one">{t('Home')}</a>,
    <a href="/about" key="two">{t('About')}</a>
  ];

  const itemsMenu = [
    <>
      <NavDropDownButton
          key="dropdown1"
          menuId="dropDownOne"
          onToggle={() => handleToggle(0)}
          isOpen={isOpen[0]}
          label={t('Explore')}
          isCurrent={true}
      />
      <Menu key="menu1" items={menuItems} isOpen={isOpen[0]} id="dropDownOne" />
    </>,
    <Link key="one" to="/login" className="usa-nav__link">
      <span>{t('Log In')}</span>
    </Link>,
    <Link key="user-edit" to="/user-edit" className="usa-nav__link">
      <i className="fa fa-user" aria-hidden="true"></i><span> {t('Edit Profile')}</span>
    </Link>,
    <Link key={"dashboard"} to="/dashboard" className="usa-nav__link">
      <i className="fa fa-tachometer" aria-hidden="true"></i><span> {t('Dashboard')}</span>
    </Link>,
    <button onClick={toggleLanguage}>{currentLangLabel}</button>, // Button to toggle language
  ];

  return (
      <>
        <Header basic={true} showMobileOverlay={expanded}>
          <div className="usa-nav-container">
            <div className="usa-navbar">
              <Link to="/" className="usa-nav__brand">
                <Title id="extended-logo">{t('Picnic Tax')}</Title>
              </Link>
              <NavMenuButton onClick={onClick} label={t('Menu')} />
            </div>
            <PrimaryNav items={itemsMenu} mobileExpanded={expanded} onToggleMobileNav={onClick} />
          </div>
        </Header>
      </>
  );
};

export default HeaderComponent;
