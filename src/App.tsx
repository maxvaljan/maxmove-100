import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drivers from "./pages/Drivers";
import DriverApplication from "./pages/DriverApplication";
import Index from "./pages/Index";
import Book from "./pages/Book";
import Business from "./pages/Business";
import About from "./pages/About";
import PersonalDelivery from "./pages/PersonalDelivery";
import Career from "./pages/Career";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AccountTypeSelection from "./pages/AccountTypeSelection";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/book" element={<Book />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/drivers/apply" element={<DriverApplication />} />
        <Route path="/business" element={<Business />} />
        <Route path="/about" element={<About />} />
        <Route path="/personal-delivery" element={<PersonalDelivery />} />
        <Route path="/career" element={<Career />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account-type-selection" element={<AccountTypeSelection />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;