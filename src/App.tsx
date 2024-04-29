
import '@trussworks/react-uswds/lib/index.css'
import '@trussworks/react-uswds/lib/uswds.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./Pages/Layout.tsx";
import LandingPage from './Pages/LandingPage/LandingPage.tsx';
import Dashboard from './Pages/DashboardPage/Dashboard.tsx';
import TaxFilingPage from './Pages/TaxFilingPage/TaxFilingPage.tsx';

function App() {
 
  return (
      <div className="app">
          <Routes>
              {/*Main Routes*/}
              <Route path="/" element={<Layout/>}>
                <Route index element={<LandingPage/>}/>   
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="tax-filing" element={<TaxFilingPage/>}/>
              </Route>
          </Routes>
      </div>
  )
}

export default App
