import { Alert, AlertTitle } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentForm from "./PaymentForm";
import { createStripePaymentSecret } from "../../store/action";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Skeleton from "../../components/shared/Skeleton";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function StripePayment() {
  const dispatch = useDispatch();
  const { clientSecret } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { user, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!clientSecret) {
      dispatch(createStripePaymentSecret(totalPrice));
    }
  }, [clientSecret]);

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto">
        <Skeleton />
      </div>
    );
  }

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      )}
    </>
  );
}

export default StripePayment;
