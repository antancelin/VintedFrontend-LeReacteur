// Packages
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// CSS
import "./App.css";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Components
import Header from "./components/Header";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visibleSignup, setVisibleSignup] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);

  return (
    <Router>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        visibleSignup={visibleSignup}
        setVisibleSignup={setVisibleSignup}
        visibleLogin={visibleLogin}
        setVisibleLogin={setVisibleLogin}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        {/* <Route
          path="/offers"
          element={
            <Home
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        /> */}
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={
            <Signup
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
      </Routes>
      {visibleSignup && (
        <Signup
          setIsAuthenticated={setIsAuthenticated}
          visibleSignup={visibleSignup}
          setVisibleSignup={setVisibleSignup}
        />
      )}
      {visibleLogin && (
        <Login
          setIsAuthenticated={setIsAuthenticated}
          visibleLogin={visibleLogin}
          setVisibleLogin={setVisibleLogin}
        />
      )}
    </Router>
  );
}

export default App;
