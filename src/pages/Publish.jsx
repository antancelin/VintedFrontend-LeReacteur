// Packages
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Publish = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const [dataObj, setDataObj] = useState({
    file: null,
    title: "",
    description: "",
    brand: "",
    size: "",
    color: "",
    state: "",
    location: "",
    price: null,
    exchanges: false,
  });

  const handlePublish = async (event) => {
    event.preventDefault();
    if (!token) {
      console.log("Vous devez être connecté pour publier une offre");
      navigate("/login");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("picture", dataObj.file);
      formData.append("title", dataObj.title);
      formData.append("description", dataObj.description);
      formData.append("brand", dataObj.brand);
      formData.append("size", dataObj.size);
      formData.append("color", dataObj.color);
      formData.append("state", dataObj.state);
      formData.append("location", dataObj.location);
      formData.append("price", dataObj.price);
      formData.append("exchanges", dataObj.exchanges);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/offer/publish`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Offre publiée", response.data);
      navigate("/offer/" + response.data._id);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="publish-main">
        <div className="publish-container">
          <h2>Vends tes articles</h2>
          <form className="publish-form" onSubmit={handlePublish}>
            <div className="file-select">
              <div>
                <div className="file-button">
                  <label htmlFor="file" className="label-file">
                    <span>+</span>
                    <span>Ajoute une photo</span>
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="input-file"
                    onChange={(event) => {
                      const newDataObj = { ...dataObj };
                      newDataObj.file = event.target.files[0];
                      setDataObj(newDataObj);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="text-input-section">
              <div className="text-input">
                <label htmlFor="title">Titre</label>
                <input
                  type="text"
                  id="title"
                  placeholder="ex: Chemise Sézane verte"
                  name="title"
                  value={dataObj.title}
                  onChange={(event) => {
                    const newDataObj = { ...dataObj };
                    newDataObj.title = event.target.value;
                    setDataObj(newDataObj);
                  }}
                />
              </div>
              <div className="text-input">
                <label htmlFor="description">Décris ton article</label>
                <input
                  type="text"
                  id="description"
                  placeholder="ex: porté quelquefois, taille correctement"
                  name="description"
                  value={dataObj.description}
                  onChange={(event) => {
                    const newDataObj = { ...dataObj };
                    newDataObj.description = event.target.value;
                    setDataObj(newDataObj);
                  }}
                />
              </div>
            </div>

            <div className="text-input-section">
              <div className="text-input">
                <label htmlFor="brand">Marque</label>
                <input
                  type="text"
                  id="brand"
                  placeholder="ex: Zara"
                  name="brand"
                  value={dataObj.brand}
                  onChange={(event) => {
                    const newDataObj = { ...dataObj };
                    newDataObj.brand = event.target.value;
                    setDataObj(newDataObj);
                  }}
                />
              </div>
              <div className="text-input">
                <label htmlFor="size">Taille</label>
                <input
                  type="text"
                  id="size"
                  placeholder="ex: L / 40 / 12"
                  name="size"
                  value={dataObj.size}
                  onChange={(event) => {
                    const newDataObj = { ...dataObj };
                    newDataObj.size = event.target.value;
                    setDataObj(newDataObj);
                  }}
                />
              </div>
              <div className="text-input">
                <label htmlFor="color">Couleur</label>
                <input
                  type="text"
                  id="color"
                  placeholder="ex: Rose"
                  name="color"
                  value={dataObj.color}
                  onChange={(event) => {
                    const newDataObj = { ...dataObj };
                    newDataObj.color = event.target.value;
                    setDataObj(newDataObj);
                  }}
                />
              </div>
              <div className="text-input">
                <label htmlFor="state">État</label>
                <input
                  type="text"
                  id="state"
                  placeholder="ex: Neuf avec étiquette"
                  name="state"
                  value={dataObj.state}
                  onChange={(event) => {
                    const newDataObj = { ...dataObj };
                    newDataObj.state = event.target.value;
                    setDataObj(newDataObj);
                  }}
                />
              </div>
              <div className="text-input">
                <label htmlFor="location">Lieu</label>
                <input
                  type="text"
                  id="location"
                  placeholder="ex: Paris"
                  name="location"
                  value={dataObj.location}
                  onChange={(event) => {
                    const newDataObj = { ...dataObj };
                    newDataObj.location = event.target.value;
                    setDataObj(newDataObj);
                  }}
                />
              </div>
            </div>

            <div className="text-input-section">
              <div className="text-input">
                <label htmlFor="price">Prix</label>
                <div className="checxbox-section">
                  <input
                    type="text"
                    id="price"
                    placeholder="0,00€"
                    name="price"
                    value={dataObj.price}
                    onChange={(event) => {
                      const newDataObj = { ...dataObj };
                      newDataObj.price = event.target.value;
                      setDataObj(newDataObj);
                    }}
                  />
                  <div className="checkbox-input">
                    <input
                      type="checkbox"
                      value={dataObj.exchanges}
                      onChange={(event) => {
                        const newDataObj = { ...dataObj };
                        newDataObj.exchanges = event.target.checked;
                        setDataObj(newDataObj);
                      }}
                    />
                    <span>Je suis intéressé(e) par les échanges</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-button">
              <button type="submit" className="form-validation">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Publish;
