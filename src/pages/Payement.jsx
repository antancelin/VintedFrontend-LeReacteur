import { loadStripe } from "@stripe/stripe-js";
import { useLocation, Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";

// Cette ligne permet de vous connecter à votre compte Stripe en fournissant votre clef publique
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payement = ({ CheckoutForm }) => {
  const location = useLocation();

  const { name, price } = location.state;

  const buyerProtection = Number((price * 0.05).toFixed(2));
  const shippingPrice = 5;
  const totalPrice = price + buyerProtection + shippingPrice;

  const options = {
    // Type de transaction
    mode: "payment",
    // Montant de la transaction
    amount: Number((totalPrice * 100).toFixed(0)),
    // Devise de la transaction
    currency: "eur",
  };

  const storedToken = Cookies.get("token");

  if (!storedToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div className="payment-main">
        <div className="payment-container">
          <div className="payment-summary">
            <h4>Résumé de la commande</h4>
            <div className="payment-content">
              <ul>
                <li>
                  Commande <span>{price}€</span>
                </li>
                <li>
                  Frais de protection acheteur <span>{buyerProtection}€</span>
                </li>
                <li>
                  Frais de port <span>{shippingPrice}€</span>
                </li>
              </ul>
            </div>
            <div className="payment-divider"></div>
            <div className="payment-total">
              <ul>
                <li>
                  Total <span>{totalPrice}€</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="payment-card">
            <div className="payment-content">
              <p>
                Il ne vous rester plus qu'une étape pour vous offrir{" "}
                <span>{name}</span>. Vous allez payer{" "}
                <span>{totalPrice} €</span> (frais de protection et de port
                inclus).
              </p>
              <div className="payment-divider"></div>
              {/* Le composant Elements doit contenir toute notre logique de paiement //
      On lui donner la preuve que nous sommes connectés et les options de
      paiement */}
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm name={name} totalPrice={totalPrice} />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payement;
