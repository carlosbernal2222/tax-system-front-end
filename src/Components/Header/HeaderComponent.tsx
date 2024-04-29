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

  const testMenuItems = [
    <a href="/" key="one">Home</a>, 
    <a href="#linkTwo" key="two">About</a>
  ];
 
  const testItemsMenu = [
    <>
      <NavDropDownButton 
        key="dropdown1" 
        menuId="testDropDownOne" 
        onToggle={() => handleToggle(0)} 
        isOpen={isOpen[0]} 
        label="Explore" 
        isCurrent={true}
      />
      <Menu key="menu1" items={testMenuItems} isOpen={isOpen[0]} id="testDropDownOne" />
    </>,
    <a key="two" href="#login" className="usa-nav__link"><span>Log In</span></a>,
  
  ];
// 
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
          <PrimaryNav items={testItemsMenu} mobileExpanded={expanded} onToggleMobileNav={onClick} />
        </div>
      </Header>
    </>
  );
};

export default HeaderComponent;
