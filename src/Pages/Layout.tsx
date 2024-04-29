import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from '../Components/Header/HeaderComponent'; // Adjust the import path as necessary

const Layout: React.FC = () => {
    return (
        <div>
            <HeaderComponent />
            <main>
                <Outlet />  // Child routes will render here
            </main>
        </div>
    );
};

export default Layout;
