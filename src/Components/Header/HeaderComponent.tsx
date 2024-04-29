import React, { useState } from "react";
import { Header, Menu, NavDropDownButton, NavMenuButton, PrimaryNav, Search, Title } from "@trussworks/react-uswds";

const HeaderComponent: React.FC = (): React.ReactElement => {
    const [expanded, setExpanded] = useState(false);
    const onClick = (): void => setExpanded(prvExpanded => !prvExpanded);
    const [isOpen, setIsOpen] = useState([false, false]);

    const onToggle = (index: number) => {
        setIsOpen(prevIsOpen =>
            prevIsOpen.map((item, idx) => idx === index ? !item : item)
        );
    };

    const testMenuItems = [
        <a href="#linkOne" key="one">Current link</a>,
        <a href="#linkTwo" key="two">Simple link Two</a>
    ];

    const testItemsMenu = [
        <>
            <NavDropDownButton menuId="testDropDownOne" onToggle={() => onToggle(0)} isOpen={isOpen[0]} label="Nav Label" isCurrent={true} />
            <Menu key="one" items={testMenuItems} isOpen={isOpen[0]} id="testDropDownOne" />
        </>,
        <a href="#two" key="two" className="usa-nav__link"><span>Parent link</span></a>,
        <a href="#three" key="three" className="usa-nav__link"><span>Parent link</span></a>
    ];

    const mockSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // handle search submit logic here
    };

    return (
        <Header basic={true} showMobileOverlay={expanded}>
            <div className="usa-nav-container">
                <div className="usa-navbar">
                    <Title>Project Title</Title>
                    <NavMenuButton onClick={onClick} label="Menu" />
                </div>
                <PrimaryNav items={testItemsMenu} mobileExpanded={expanded} onToggleMobileNav={onClick}>
                    <Search size="small" onSubmit={mockSubmit} />
                </PrimaryNav>
            </div>
        </Header>
    );
};

export default HeaderComponent;
