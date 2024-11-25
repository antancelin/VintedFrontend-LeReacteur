// Packages
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// Images
import tear from "../assets/imgs/tear.svg";

const Home = ({ setIsLoading, isLoading, setIsAuthenticated, title }) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";
        if (title) {
          filters += "?title=" + title;
        }
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/v2/offers` + filters,
          {
            params: {
              limit: limit,
              page: page,
            },
          }
        );
        setData(response.data);
        setTotalPages(Math.ceil(response.data.count / limit));

        if (Cookies.get("token")) {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, [page, limit, setIsAuthenticated, setIsLoading, navigate, title]);

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
          <div className="pagination-container">
            <div className="pagination-start">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                Précédent
              </button>
              <span>
                {page} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
              >
                Suivant
              </button>
            </div>
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
          </div>
          <div className="pagination-container">
            <div className="pagination-end">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                Précédent
              </button>
              <span>
                {page} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
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
