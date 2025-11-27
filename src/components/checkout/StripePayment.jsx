import { Alert, AlertTitle } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import PaymentForm from "./PaymentForm";

function StripePayment() {
  const { clientSecret } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { user, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth
  );
  return (
    <>
      {clientSecret && (
        <Element stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Element>
      )}
    </>
  );
}

export default StripePayment;
