// Packages
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Login = ({ setIsAuthenticated, visibleLogin, setVisibleLogin }) => {
  const navigate = useNavigate();
  const [body, setBody] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        body
      );
      Cookies.set("token", response.data.token, { expires: 7 });
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      if (error.response.data.message === "wrong email or password") {
        setErrorMessage("Mauvaise adresse email ou password");
      } else {
        setErrorMessage("Une erreur est survenue, veuillez réessayer !");
      }
    }
  };

  useEffect(() => {
    if (visibleLogin) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [visibleLogin]);

  return (
    <>
      <div className="signup-container">
        <div
          className="modal-container"
          onClick={() => {
            setVisibleLogin(false);
          }}
        >
          <div
            className="modal"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <h2>Se connecter</h2>
            <form className="signup-form" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(event) => {
                  const newObj = { ...body };
                  newObj.email = event.target.value;
                  setBody(newObj);
                }}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                onChange={(event) => {
                  const newObj = { ...body };
                  newObj.password = event.target.value;
                  setBody(newObj);
                }}
              />
              <button>Se connecter</button>
              {errorMessage && (
                <span className="error-message">{errorMessage}</span>
              )}
            </form>
            <a
              onClick={() => {
                navigate("/signup");
              }}
            >
              Pas encore de compte ? Inscris-toi !
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
