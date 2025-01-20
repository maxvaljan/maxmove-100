import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drivers from "./pages/Drivers";
import DriverApplication from "./pages/DriverApplication";
import Index from "./pages/Index";
import Book from "./pages/Book";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/book" element={<Book />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/drivers/apply" element={<DriverApplication />} />
      </Routes>
    </Router>
  );
}

export default App;