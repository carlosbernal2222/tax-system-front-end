import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Header, Title, NavMenuButton, PrimaryNav, Menu, NavDropDownButton } from '@trussworks/react-uswds';
import { Link } from 'react-router-dom';

const HeaderComponent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const onClick = (): void => setExpanded(prevExpanded => !prevExpanded);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');


  const [isOpen, setIsOpen] = useState([false, false]);
  /**
   * Handles the toggle functionality for a specific index.
   * @param index - The index of the element to toggle.
   */
  const handleToggle = (index: number) => {
    setIsOpen(prevIsOpen => {
      const newIsOpen = [...prevIsOpen];
      newIsOpen[index] = !prevIsOpen[index];
      return newIsOpen;
    });
  };

  useEffect(() => {
    console.log("isLoggedIn changed:", isLoggedIn);
  }, [isLoggedIn]);

  /**
   * Toggles the language between English and Spanish.
   */
  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('es') ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const currentLangLabel = i18n.language.startsWith('es') ? t('English') : t('Español');

  
  /**
   * Represents the header component of the application.
   */
  const menuItems = [
    <a href="/" key="one">{t('Home')}</a>,
    <a href="/about" key="two">{t('About')}</a>
  ];

  
  /**
   * Handles the login functionality.
   * If the timeout is not already set, it sets the user as logged in and stores the login status in local storage.
   * Redirects the user to the login page.
   */
  const handleLogin = () => {
    // Check if the timeout is already set
    if (!localStorage.getItem('isLoggedInTimeout')) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
    }

    window.location.replace("http://team8.skillstorm-congo.com:8080/users/signin");
  };


/**
 * Handles the logout functionality.
 */
const handleLogout = () => {
  
  if (!localStorage.getItem('isLoggedInTimeout')) {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  }

  window.location.replace("http://team8.skillstorm-congo.com:8080/logout");
};


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
    isLoggedIn ? (
      <Link key={"dashboard"} to="/dashboard" className="usa-nav__link">
        <i className="fa fa-tachometer" aria-hidden="true"></i><span> {t('Dashboard')}</span>
      </Link>
    ): (
      <Link key="one" to="" className="usa-nav__link" onClick={handleLogin}>
        <span>{t('Log In')}</span>
      </Link>
    ),
    isLoggedIn ?(
    <Link key="one" to="" className="usa-nav__link" onClick={handleLogout}>
        <span>{t('Log Out')}</span>
      </Link>
    ):(
      <></>
    ),
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

