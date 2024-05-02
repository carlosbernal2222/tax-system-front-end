import React, { useState } from 'react';
import { Header, Title, NavMenuButton, PrimaryNav, Menu, NavDropDownButton } from '@trussworks/react-uswds';
import { Link } from 'react-router-dom';

const HeaderComponent: React.FC = () => {
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

  const menuItems = [
    <a href="/" key="one">Home</a>,
    <a href="/about" key="two">About</a>
  ];

  const itemsMenu = [
    <>
      <NavDropDownButton
          key="dropdown1"
          menuId="dropDownOne"
          onToggle={() => handleToggle(0)}
          isOpen={isOpen[0]}
          label="Explore"
          isCurrent={true}
      />
      <Menu key="menu1" items={menuItems} isOpen={isOpen[0]} id="dropDownOne" />
    </>,
    <Link key="one" to="/login" className="usa-nav__link">
      <span>Log In</span>
    </Link>,
    <Link key="user-edit" to="/user-edit" className="usa-nav__link">
      <i className="fa fa-user" aria-hidden="true"></i><span> Edit Profile</span>
    </Link>,
    <Link key={"dashboard"} to="/dashboard" className="usa-nav__link">
          <i className="fa fa-tachometer" aria-hidden="true"></i><span> Dashboard</span>
    </Link>,
  ];

  return (
      <>
        <Header basic={true} showMobileOverlay={expanded}>
          <div className="usa-nav-container">
            <div className="usa-navbar">
              <Link to="/" className="usa-nav__brand">
                <Title id="extended-logo">Picnic Tax</Title>
              </Link>
              <NavMenuButton onClick={onClick} label="Menu" />
            </div>
            <PrimaryNav items={itemsMenu} mobileExpanded={expanded} onToggleMobileNav={onClick} />
          </div>
        </Header>
      </>
  );
};

export default HeaderComponent;
