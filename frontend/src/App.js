import React, { useState  } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import News from "./components/news";
import LoadingBar from "react-top-loading-bar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import './App.css'; // Ensure to import your CSS for background

const App = () => {
  const pageSize = 15;
  const [progress, setProgress] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSetProgress = (progress) => {
    setProgress(progress);
  };

  const handleLogin = () => {
    setIsAuthenticated(true); // Log in user
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Redirect to the login page after logging out
    window.location.href = '/'; // Navigate to login page
  };



  return (
    <div className="background"> {/* Background image container */}
      <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}

        <LoadingBar color="#f11946" height={3} progress={progress} />


        <Routes>
          {/* Redirect to login/signup by default */}
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/home" /> : <Login handleLogin={handleLogin} />}
          />
          <Route path="/signup" element={<Signup />} />

          {/* Main application routes, protected by authentication */}
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <News
                  setProgress={handleSetProgress}
                  key="default"
                  pageSize={pageSize}
                  country="in"
                  category="general"
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/sports"
            element={
              isAuthenticated ? (
                <News
                  setProgress={handleSetProgress}
                  key="sports"
                  pageSize={pageSize}
                  country="in"
                  category="sports"
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/business"
            element={
              isAuthenticated ? (
                <News
                  setProgress={handleSetProgress}
                  key="business"
                  pageSize={pageSize}
                  country="in"
                  category="business"
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/entertainment"
            element={
              isAuthenticated ? (
                <News
                  setProgress={handleSetProgress}
                  key="entertainment"
                  pageSize={pageSize}
                  country="in"
                  category="entertainment"
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/health"
            element={
              isAuthenticated ? (
                <News
                  setProgress={handleSetProgress}
                  key="health"
                  pageSize={pageSize}
                  country="in"
                  category="health"
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/science"
            element={
              isAuthenticated ? (
                <News
                  setProgress={handleSetProgress}
                  key="science"
                  pageSize={pageSize}
                  country="in"
                  category="science"
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/technology"
            element={
              isAuthenticated ? (
                <News
                  setProgress={handleSetProgress}
                  key="technology"
                  pageSize={pageSize}
                  country="in"
                  category="technology"
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          
          {/* Redirect to /home for unmatched routes if authenticated */}
          <Route
            path="*"
            element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
