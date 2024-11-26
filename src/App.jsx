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
import Publish from "./pages/Publish";
import Payement from "./pages/Payement";

// Components
import Header from "./components/Header";
import CheckoutForm from "./components/CheckoutForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <Router>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        title={title}
        setTitle={setTitle}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home setIsAuthenticated={setIsAuthenticated} title={title} />
          }
        />
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
        <Route
          path="/publish"
          element={<Publish isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/payement"
          element={<Payement CheckoutForm={CheckoutForm} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
