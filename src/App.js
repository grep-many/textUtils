import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/About';
import NavbarComponent from "./components/NavbarComponent";
import TextForm from './components/TextForm';
import React, { useState, useEffect } from 'react';
import Alert from './components/Alert';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  window.onload = () => {
    localStorage.removeItem('userText')
    console.clear()
    console.log('error shown for latest react router v7')
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

  // Define routes using createBrowserRouter
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavbarComponent title='TextUtils' aboutText='About' isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <div className='my-1 sticky-top' style={{ height: '50px', top:'70px'}}>
            {alert && <Alert alert={alert} setAlert={setAlert} />}
          </div>
          <TextForm heading="Enter the Text to Analyze" isDarkMode={isDarkMode} showAlert={showAlert} />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <NavbarComponent title='TextUtils' aboutText='About' isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <div className='my-1 sticky-top' style={{ height: '50px' , top:'70px' }}>
            {alert && <Alert alert={alert} setAlert={setAlert} />}
          </div>
          <About isDarkMode={isDarkMode} />
        </>
      ),
    },
  ], {
    basename: "/textUtils/"
  }
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
