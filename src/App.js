import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Projects from "./Pages/project";
import CertificationsPage from "./Pages/certerficate";
// Main App Component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        {/* Add more routes as needed */}
        {/* Example: <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
};

export default App;