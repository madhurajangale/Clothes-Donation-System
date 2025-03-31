import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NGOs from "./pages/NGOs";
import History from "./pages/History";
import ProtectedRFoute from "./components/ProtectedRFoute.jsx";
import Ngoreq from "./pages/Ngoreq";
import './index.css'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/ngoreq" element={<Ngoreq />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ngos" element={<NGOs />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
