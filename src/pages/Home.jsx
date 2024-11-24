// Packages
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// Images
import tear from "../assets/imgs/tear.svg";

const Home = ({ setIsLoading, isLoading, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const limitValues = [20, 60, 120];

  const paginationButtons = () => {
    const totalPages = Math.ceil(data.count / limit);
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={page === i ? "activate" : "deactivate"}
        >
          {i}
        </button>
      );
      return buttons;
    }
  };

  useEffect(() => {
    // const searchParams = new URLSearchParams(window.location.search);
    // const pageParam = searchParams.get("page");
    // const limitParam = searchParams.get("limit");

    // if (pageParam) setPage(Number(pageParam));
    // if (limitParam) setLimit(Number(limitParam));

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/v2/offers`,
          {
            params: {
              limit: limit,
              page: page,
            },
          }
        );
        setData(response.data);
        if (Cookies.get("token")) {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
    // navigate(`/offers?page=${page}&limit=${limit}`, { replace: true });
  }, [page, limit, setIsAuthenticated, setIsLoading, navigate]);

  return (
    <>
      <div className="img-background">
        <img src={tear} alt="tear" className="tear-img" />
        <div className="home-container">
          <div className="home-content">
            <h1>Prêts à faire du tri dans vos placards ?</h1>
            <button>Commencer à vendre</button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <span>En cours de chargement...</span>
      ) : (
        <>
          <div className="limit">
            <span>Produits par page</span>
            {limitValues.map((limitValue) => {
              return (
                <button
                  key={limitValue}
                  onClick={() => {
                    setLimit(limitValue);
                  }}
                  className={limit === limitValue ? "activate" : "deactivate"}
                >
                  {limitValue}
                </button>
              );
            })}
          </div>
          <div className="home-cards">
            {data.offers.map((item) => {
              return (
                <React.Fragment key={item._id}>
                  <div
                    className="card-container"
                    onClick={() => {
                      navigate(`/offer/${item._id}`);
                    }}
                  >
                    <div className="user-infos">
                      {item.owner.account.avatar && (
                        <img
                          src={item.owner.account.avatar.url}
                          alt="user_avatar"
                        />
                      )}
                      <span>{item.owner.account.username}</span>
                    </div>
                    <div className="product-infos">
                      <img src={item.product_image.url} alt="product-image" />
                      <div>
                        <span>{item.product_price.toFixed(2)}€</span>
                        {item.product_details.map((detail, indexT) => {
                          return (
                            <React.Fragment key={indexT}>
                              {detail["TAILLE"] && (
                                <span>{detail["TAILLE"]}</span>
                              )}
                            </React.Fragment>
                          );
                        })}

                        {item.product_details.map((detail, indexM) => {
                          return (
                            <React.Fragment key={indexM}>
                              {detail["MARQUE"] && (
                                <span>{detail["MARQUE"]}</span>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            <div className="pagination">
              <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                Précédent
              </button>
              <button>{paginationButtons()}</button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === Math.ceil(data.count / limit)}
              >
                Suivant
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
