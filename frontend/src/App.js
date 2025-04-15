import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NGOs from "./pages/NGOs";
import History from "./pages/History";
import Ngoreq from "./pages/Ngoreq";
import Profile from "./pages/Profile";
import './index.css';

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setRole(storedUser?.role || null);

    // 👉 Inject Google Analytics
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-CZRVG49ZT0";
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-CZRVG49ZT0');
    `;
    document.head.appendChild(script2);
  }, []);

  const isUserLoggedIn = role === "user";
  const isNGOLoggedIn = role === "ngo";

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          isUserLoggedIn
            ? <Navigate to="/home" replace />
            : isNGOLoggedIn
              ? <Navigate to="/ngohome" replace />
              : <Navigate to="/login" replace />
        } />
        <Route path="/login" element={
          isUserLoggedIn || isNGOLoggedIn
            ? <Navigate to={isUserLoggedIn ? "/home" : "/ngoreq"} replace />
            : <Login onLogin={() => {
                const storedUser = JSON.parse(localStorage.getItem("user"));
                setRole(storedUser?.role || null);
              }} />
        } />
        <Route path="/signup" element={
          isUserLoggedIn || isNGOLoggedIn
            ? <Navigate to={isUserLoggedIn ? "/home" : "/ngoreq"} replace />
            : <Signup />
        } />
        <Route path="/home" element={<Home />} />
        <Route path="/ngoreq" element={<Ngoreq />} />
        <Route path="/ngos" element={<NGOs />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
