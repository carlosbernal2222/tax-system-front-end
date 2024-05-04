import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector) // detect user language
    .use(initReactI18next) // passes i18n instance to react-i18next
    .init({
        debug: true,
        fallbackLng: 'en', // use English if detected language is not available
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    "Welcome to React": "Welcome to React and react-i18next",
                    "Introduction": "Introduction",
                    "File Your Taxes with Ease": "File Your Taxes with Ease:",
                    "Seamless Online Tax Preparation": "Seamless Online Tax Preparation",
                    "Skip the stress of tax season with our straightforward digital tools designed to guide you through each step. Whether you're filing as an individual or for your business, we make it easy so you can focus on what matters most.": "Skip the stress of tax season with our straightforward digital tools designed to guide you through each step. Whether you're filing as an individual or for your business, we make it easy so you can focus on what matters most.",
                    "Join Us": "Join Us",
                    "Tax preparation": "Tax preparation",
                    "Menu": "Menu",
                    "Explore": "Explore",
                    "Log In": "Log In",
                    "Edit Profile": "Edit Profile",
                    "Dashboard": "Dashboard",
                    "Home": "Home",
                    "About": "About"
                }
            },
            es: {
                translation: {
                    "Welcome to React": "Bienvenido a React y react-i18next",
                    "Introduction": "Introducción",
                    "File Your Taxes with Ease": "Declara tus impuestos fácilmente",
                    "Seamless Online Tax Preparation": "Preparación de impuestos en línea sin complicaciones",
                    "Skip the stress of tax season with our straightforward digital tools designed to guide you through each step. Whether you're filing as an individual or for your business, we make it easy so you can focus on what matters most.": "Omite el estrés de la temporada de impuestos con nuestras herramientas digitales sencillas diseñadas para guiarte en cada paso. Ya sea que declares como individuo o para tu empresa, lo hacemos fácil para que puedas concentrarte en lo que más importa.",
                    "Join Us": "Únete a nosotros",
                    "Tax preparation": "Preparación de impuestos",
                    "Menu": "Menú",
                    "Explore": "Explorar",
                    "Log In": "Iniciar sesión",
                    "Edit Profile": "Editar perfil",
                    "Dashboard": "Tablero",
                    "Home": "Inicio",
                    "About": "Acerca de"
                }
            }
        }
    });

export default i18n;
