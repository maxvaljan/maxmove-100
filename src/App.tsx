import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drivers from "./pages/Drivers";
import DriverApplication from "./pages/DriverApplication";
import Index from "./pages/Index";
import Book from "./pages/Book";
import Business from "./pages/Business";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/book" element={<Book />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/drivers/apply" element={<DriverApplication />} />
        <Route path="/business" element={<Business />} />
      </Routes>
    </Router>
  );
}

export default App;