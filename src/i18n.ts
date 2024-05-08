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
                    "About": "About",

                    //Dashboard Page
                    "Tax Filings Dashboard": "Tax Filings Dashboard",
                    "Start New Filing": "Start New Filing",
                    "Filing ID": "Filing ID",
                    "Year": "Year",
                    "Status": "Status",
                    "Completed": "Completed",
                    "In Progress": "In Progress",
                    "Continue Filing": "Continue Filing",
                    "No tax filings available.": "No tax filings available.",
                    "Not Calculated": "Not Calculated",
                    "Tax Due": "Tax Due",
                    "Tax Refund": "Tax Refund",

                    //TaxFilingPage
                    "Tax Filing": "Tax Filing",
                    "Personal Information": "Personal Information",
                    "W2 Income": "W2 Income",
                    "Self Employment Income": "Self Employment Income",
                    "Review": "Review",
                    "Result": "Result",
                    "completed": "completed",
                    "not completed": "not completed",
                    "Step": "Step",
                    "of": "of",
                    "Back": "Back",
                    "Next": "Next",

                    //PersonalInformation
                    "Personal information updated successfully!": "Personal information updated successfully!",
                    "First Name": "First Name",
                    "Middle Name (Optional)": "Middle Name (Optional)",
                    "Last Name": "Last Name",
                    "Social Security Number": "Social Security Number",
                    "Address": "Address",
                    "Phone Number": "Phone Number",
                    "Save Personal Information": "Save Personal Information",
                    "Filing Status": "Filing Status",
                    "Single": "Single",
                    "Jointly": "Jointly",

                    //W2Income
                    "W2 Income for Tax Return ID: {{id}}": "W2 Income for Tax Return ID: {{id}}",
                    "W2 form created successfully!": "W2 form created successfully!",
                    "Error creating W2 form. Please try again.": "Error creating W2 form. Please try again.",

                    //W2CreateForm
                    "Employer ID": "Employer ID",
                    "Wages": "Wages",
                    "Federal Tax Withheld": "Federal Tax Withheld",
                    "Social Security Tax Withheld": "Social Security Tax Withheld",
                    "Medicare Tax Withheld": "Medicare Tax Withheld",
                    "Submit W2 Form": "Submit W2 Form",

                    //W2Lists
                    "W2 Forms List": "W2 Forms List",
                    "Social Security Withheld": "Social Security Withheld",
                    "Medicare Withheld": "Medicare Withheld",
                    "Actions": "Actions",
                    "Delete": "Delete",

                    //Form1099CreateForm
                    "Payer": "Payer",
                    "Submit 1099 Form": "Submit 1099 Form",

                    //Form1099Lists
                    "Form 1099 List": "Form 1099 List",
                    "Failed to fetch Form 1099s": "Failed to fetch Form 1099s",
                    "Error fetching Form 1099s:": "Error fetching Form 1099s:",
                    "Failed to delete the Form 1099": "Failed to delete the Form 1099",
                    "Error deleting Form 1099:": "Error deleting Form 1099:",
                    "No Form 1099s found for this tax return.": "No Form 1099s found for this tax return.",

                    //ReviewPage
                    "Review Tax Return for ID": "Review Tax Return for ID",
                    "Name": "Name",
                    "SSN": "SSN",
                    "Phone": "Phone",
                    "Tax Year and Filing Status": "Tax Year and Filing Status",
                    "W2 Forms": "W2 Forms",
                    "W2 from": "W2 from",
                    "Federal Income Tax Withheld": "Federal Income Tax Withheld",
                    "No W2 forms available.": "No W2 forms available.",
                    "1099 Forms": "1099 Forms",
                    "1099 from": "1099 from",
                    "Amount": "Amount",
                    "No 1099 forms available.": "No 1099 forms available.",
                    "Submit Tax Return": "Submit Tax Return",

                    //ResultsPage
                    "Refund": "Refund",
                    "The calculated {{resultType}} for your tax return is shown above.": "The calculated {{resultType}} for your tax return is shown above.",
                    "Back to Dashboard": "Back to Dashboard"

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
                    "About": "Acerca de",

                    //Dashboard Page
                    "Tax Filings Dashboard": "Panel de Declaraciones Fiscales",
                    "Start New Filing": "Iniciar Nueva Declaración",
                    "Filing ID": "ID de la Declaración",
                    "Year": "Año",
                    "Status": "Estado",
                    "Completed": "Completado",
                    "In Progress": "En Progreso",
                    "Continue Filing": "Continuar Declaración",
                    "No tax filings available.": "No hay declaraciones disponibles.",
                    "Not Calculated": "No Calculado",
                    "Tax Due": "Impuesto a Pagar",
                    "Tax Refund": "Devolución de Impuestos",

                    //TaxFilingPage
                    "Tax Filing": "Declaración de Impuestos",
                    "Personal Information": "Información Personal",
                    "W2 Income": "Ingresos W2",
                    "Self Employment Income": "Ingresos por Autónomos",
                    "Review": "Revisión",
                    "Result": "Resultado",
                    "completed": "completado",
                    "not completed": "no completado",
                    "Step": "Paso",
                    "of": "de",
                    "Back": "Atrás",
                    "Next": "Siguiente",

                    //PersonalInformation
                    "Personal information updated successfully!": "¡Información personal actualizada con éxito!",
                    "First Name": "Nombre",
                    "Middle Name (Optional)": "Segundo nombre (Opcional)",
                    "Last Name": "Apellido",
                    "Social Security Number": "Número de Seguridad Social",
                    "Address": "Dirección",
                    "Phone Number": "Número de Teléfono",
                    "Save Personal Information": "Guardar Información Personal",
                    "Filing Status": "Estado Civil",
                    "Single": "Soltero",
                    "Jointly": "Conjuntamente",

                    //W2Income
                    "W2 Income for Tax Return ID: {{id}}": "Ingresos W2 para la declaración de impuestos ID: {{id}}",
                    "W2 form created successfully!": "¡Formulario W2 creado con éxito!",
                    "Error creating W2 form. Please try again.": "Error al crear el formulario W2. Por favor, inténtelo de nuevo.",

                    //W2CreateForm
                    "Employer ID": "ID del empleador",
                    "Wages": "Salarios",
                    "Federal Tax Withheld": "Impuesto Federal Retenido",
                    "Social Security Tax Withheld": "Impuesto de Seguridad Social Retenido",
                    "Medicare Tax Withheld": "Impuesto Medicare Retenido",
                    "Submit W2 Form": "Enviar Formulario W2",

                    //W2Lists
                    "W2 Forms List": "Lista de Formularios W2",
                    "Social Security Withheld": "Impuesto de Seguridad Social Retenido",
                    "Medicare Withheld": "Impuesto de Medicare Retenido",
                    "Actions": "Acciones",
                    "Delete": "Eliminar",

                    //Create1099Form
                    "Payer": "Pagador",
                    "Submit 1099 Form": "Enviar Formulario 1099",

                    //Form1099Lists
                    "Form 1099 List": "Lista de Formularios 1099",
                    "Failed to fetch Form 1099s": "Error al obtener los Formularios 1099",
                    "Error fetching Form 1099s:": "Error al obtener los Formularios 1099:",
                    "Failed to delete the Form 1099": "Error al eliminar el Formulario 1099",
                    "Error deleting Form 1099:": "Error al eliminar el Formulario 1099:",
                    "No Form 1099s found for this tax return.": "No se encontraron Formularios 1099 para esta declaración.",

                    //ReviewPage
                    "Review Tax Return for ID": "Revisión de la Declaración de Impuestos para el ID",
                    "Name": "Nombre",
                    "SSN": "SSN",
                    "Phone": "Teléfono",
                    "Tax Year and Filing Status": "Año Fiscal y Estado de la Declaración",
                    "W2 Forms": "Formularios W2",
                    "W2 from": "W2 de",
                    "Federal Income Tax Withheld": "Impuesto Federal Retenido",
                    "No W2 forms available.": "No hay formularios W2 disponibles.",
                    "1099 Forms": "Formularios 1099",
                    "1099 from": "1099 de",
                    "Amount": "Monto",
                    "No 1099 forms available.": "No hay formularios 1099 disponibles.",
                    "Submit Tax Return": "Enviar Declaración de Impuestos",

                    "Refund": "Reembolso",
                    "The calculated {{resultType}} for your tax return is shown above.": "El {{resultType}} calculado para su declaración de impuestos se muestra arriba.",
                    "Back to Dashboard": "Volver al Tablero"
                }
            }
        }
    });

export default i18n;
