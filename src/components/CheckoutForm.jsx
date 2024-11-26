import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = ({ name, totalPrice }) => {
  // Permet de faire une requête à Stripe pour confirmer le paiement
  const stripe = useStripe();
  // Permet de récupérer le contenu des inputs
  const elements = useElements();

  // State qui gère les messages d'erreurs
  const [errorMessage, setErrorMessage] = useState(null);
  // State qui gère le fait que le paiement a été effectué
  const [completed, setCompleted] = useState(false);
  // State qui gère le fait qu'on est en train de payer
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On commence à charger
    setIsLoading(true);

    if (elements == null) {
      return;
    }

    // Vérification et validation des infos entrées dans les inputs
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Affiche l'erreur en question
      setErrorMessage(submitError.message);
      return;
    }

    // Demande au backend de créer l'intention de paiement, il nous renvoie le clientSecret
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/v2/payment`,
      {
        title: name,
        amount: totalPrice,
      }
    );

    const clientSecret = response.data.client_secret;

    // Requête à Stripe pour valider le paiement
    const stripeResponse = await stripe.confirmPayment({
      // elements contient les infos et la configuration du paiement
      elements,
      clientSecret,
      // Éventuelle redirection
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
      // Bloque la redirections
      redirect: "if_required",
    });

    if (stripeResponse.error) {
      alert("Une erreur s'est produite");
      setErrorMessage(stripeResponse.error.message);
    } else {
      alert("Tout s'est bien passé : vous êtes maintenant ruiné ! 😘");
    }

    // Si on reçois un status succeeded on fais passer completed à true
    if (stripeResponse.paymentIntent.status === "succeeded") {
      setCompleted(true);
    }
    // On a fini de charger
    setIsLoading(false);
  };

  return completed ? (
    <p>Paiement effectué ✅</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements || isLoading}>
        Pay
      </button>
      {/* Éventuel message d'erreur */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
