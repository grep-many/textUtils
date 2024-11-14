import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/About';
import NavbarComponent from "./components/NavbarComponent";
import TextForm from './components/TextForm';
import React, { useState, useEffect } from 'react';
import Alert from './components/Alert';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  window.onload = () => {
    localStorage.removeItem('userText');
  }; // This will clear all items in localStorage before the page reloads

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [alert, setAlert] = useState(null);

  const showAlert = (title, para, danger) => {
    setAlert({
      title,
      para,
      danger,
      isDarkMode
    });
  }

  // Fetches the predefined preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  // Toggle dark mode state
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);  // Save preference in localStorage
      return newMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      showAlert('Toggled Dark Mode!', 'Enabled dark mode', false, isDarkMode);
    } else {
      showAlert('Toggled Dark Mode!', 'Disabled dark mode', false, isDarkMode);
    }
  }, [isDarkMode]);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  return (
    <BrowserRouter basename="/textUtils">
      <NavbarComponent title='TextUtils' aboutText='About' isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className='my-1 sticky-top' style={{ height: '50px', top: '70px' }}>
        {alert && <Alert alert={alert} setAlert={setAlert} />}
      </div>
      <Routes>
        <Route
          path="/"
          element={<TextForm heading="Enter the Text to Analyze" isDarkMode={isDarkMode} showAlert={showAlert} />}
        />
        <Route
          path="/about"
          element={<About isDarkMode={isDarkMode} />}
        />
        {/* Fallback Route for non-matching paths */}
        <Route
          path="*"
          element={<TextForm heading="Enter the Text to Analyze" isDarkMode={isDarkMode} showAlert={showAlert} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
