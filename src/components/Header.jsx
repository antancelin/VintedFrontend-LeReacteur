// Packages
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Pictures
import vintedLogo from "../assets/imgs/vinted-logo.png";

// Icons
import { CiSearch } from "react-icons/ci";

const Header = ({ isAuthenticated, setIsAuthenticated, title, setTitle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <div className="header-container">
        <div className="header-content">
          <div className="logo">
            <img
              src={vintedLogo}
              alt="vinted-logo"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <div className="search-container">
            <CiSearch className="search-icon" />
            <input
              type="text"
              className="search-bar"
              placeholder="Recherche des articles"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="header-buttons">
            {isAuthenticated ? (
              <div className="disconnect-button">
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Se déconnecter
                </button>
              </div>
            ) : (
              <>
                <div className="user-buttons">
                  <button
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    S'inscrire
                  </button>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Se connecter
                  </button>
                </div>
              </>
            )}
            <button
              className="publish-button"
              onClick={() => {
                navigate("/publish");
              }}
            >
              Vends tes articles
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
