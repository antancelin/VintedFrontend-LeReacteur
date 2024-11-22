import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ data, isLoading }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="img-background">
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
        </>
      )}
    </>
  );
};

export default Home;
