import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from '../Components/Header/HeaderComponent';
import FooterComponent from '../Components/Footer/FooterComponent';
import './Layout.css';


const Layout: React.FC = () => {
    return (
        <div className='layout-container'>
            <HeaderComponent />
            <main className='main-content'>
                <Outlet /> 
            </main>
            <FooterComponent/>
        </div>
    );
};

export default Layout;
