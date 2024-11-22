// Packages
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [offerData, setOfferData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/v2/offers/${id}`
      );
      setOfferData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <span>En cours de chargement...</span>
      ) : (
        <>
          <div className="offer-body">
            <div className="offer-container">
              <div className="offer-pictures">
                <img src={offerData.product_image.url} alt="product-image" />
              </div>
              <div className="offer-infos">
                <div>
                  <span className="offer-price">
                    {offerData.product_price.toFixed(2)}€
                  </span>
                  <ul className="offer-list">
                    <li>
                      {offerData.product_details.map((detail, indexM) => {
                        return (
                          <React.Fragment key={indexM}>
                            {detail["MARQUE"] && (
                              <>
                                <span>MARQUE</span>
                                <span>{detail["MARQUE"]}</span>
                              </>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </li>
                    <li>
                      {offerData.product_details.map((detail, indexT) => {
                        return (
                          <React.Fragment key={indexT}>
                            {detail["TAILLE"] && (
                              <>
                                <span>TAILLE</span>
                                <span>{detail["TAILLE"]}</span>
                              </>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </li>
                    <li>
                      {offerData.product_details.map((detail, indexE) => {
                        return (
                          <React.Fragment key={indexE}>
                            {detail["ÉTAT"] && (
                              <>
                                <span>ÉTAT</span>
                                <span>{detail["ÉTAT"]}</span>
                              </>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </li>
                    <li>
                      {offerData.product_details.map((detail, indexC) => {
                        return (
                          <React.Fragment key={indexC}>
                            {detail["COULEUR"] && (
                              <>
                                <span>COULEUR</span>
                                <span>{detail["COULEUR"]}</span>
                              </>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </li>
                    <li>
                      {offerData.product_details.map((detail, indexEm) => {
                        return (
                          <React.Fragment key={indexEm}>
                            {detail["EMPLACEMENT"] && (
                              <>
                                <span>EMPLACEMENT</span>
                                <span>{detail["EMPLACEMENT"]}</span>
                              </>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </li>
                    <li>
                      {offerData.product_details.map((detail, indexMP) => {
                        return (
                          <React.Fragment key={indexMP}>
                            {detail["MODES DE PAIEMENT"] && (
                              <>
                                <span>MODES DE PAIEMENT</span>
                                <span>{detail["MODES DE PAIEMENT"]}</span>
                              </>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </li>
                  </ul>
                </div>
                <div className="divider"></div>
                <div className="offer-content">
                  <p className="offer-name">{offerData.product_name}</p>
                  <p className="offer-description">
                    {offerData.product_description}
                  </p>
                  <div className="offer-avatar-username">
                    {offerData.owner.account.avatar && (
                      <img
                        src={offerData.owner.account.avatar.url}
                        alt="user-avatar"
                      />
                    )}
                    <span>{offerData.owner.account.username}</span>
                  </div>
                </div>
                <button>Acheter</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Offer;
