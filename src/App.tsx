
import '@trussworks/react-uswds/lib/index.css'
import '@trussworks/react-uswds/lib/uswds.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./Pages/Layout.tsx";
import LandingPage from './Pages/LandingPage/LandingPage.tsx';
import Dashboard from './Pages/DashboardPage/Dashboard.tsx';
import TaxFilingPage from './Pages/TaxFilingPage/TaxFilingPage.tsx';
import PersonalInformation from "./Pages/PersonalInformation/PersonalInformation.tsx";
import W2Income from "./Pages/Incomes/W2Income.tsx";
import SelfEmploymentIncome from "./Pages/Incomes/SelfEmploymentIncome.tsx";
import ResultsPage from "./Pages/ReviewPage/ReviewPage.tsx";
import ReviewPage from "./Pages/ReviewPage/ReviewPage.tsx";
import ProfilePage from "./Pages/ProfilePage/ProfilePage.tsx";
function App() {

  return (
      <div className="app">
          <Routes>
              {/*Main Routes*/}
              <Route path="/" element={<Layout/>}>
                <Route index element={<LandingPage/>}/>
                <Route path={"edit-profile"} element={<ProfilePage/>}/>
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="tax-filing/:id" element={<TaxFilingPage/>}>
                    <Route path="personal-information" element={<PersonalInformation taxReturnId={0}/>}/>
                    <Route path="w2-income" element={<W2Income taxReturnId={0}/>}/>
                    <Route path="self-employment-income" element={<SelfEmploymentIncome taxReturnId={0}/>}/>
                    <Route path="review" element={<ReviewPage taxReturnId={0}/>}/>
                    <Route path="result" element={<ResultsPage taxReturnId={0}/>}/>
                </Route>
              </Route>
          </Routes>
      </div>
  )
}

export default App
