import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddressInfo from "../checkout/AddressInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../../store/action";
import toast from "react-hot-toast";
import Skeleton from "../../components/shared/Skeleton";
import ErrorPage from "../../components/shared/ErrorPage";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import StripePayment from "./StripePayment";
import PaypalPayment from "./PaypalPayment";
import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaClipboardList,
  FaLock,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
} from "react-icons/fa";

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { cart, totalPrice } = useSelector((state) => state.carts);
  const { address, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth,
  );

  const { paymentMethod } = useSelector((state) => state.payment);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    if (activeStep === 0 && !selectedUserCheckoutAddress) {
      toast.error("Please select checkout address before proceeding!");
      return;
    }
    if (activeStep === 1 && (!selectedUserCheckoutAddress || !paymentMethod)) {
      toast.error("Please select payment method before proceeding!");
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const steps = [
    {
      label: "Address",
      icon: FaMapMarkerAlt,
      description: "Choose delivery address",
    },
    {
      label: "Payment Method",
      icon: FaCreditCard,
      description: "Select payment option",
    },
    {
      label: "Order Summary",
      icon: FaClipboardList,
      description: "Review your order",
    },
    {
      label: "Payment",
      icon: FaLock,
      description: "Complete payment",
    },
  ];

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <FaLock className="text-white text-3xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Secure Checkout
              </h1>
              <p className="text-gray-600 mt-1">
                Complete your purchase in a few simple steps
              </p>
            </div>
          </div>
        </div>

        {/* Custom Stepper */}
        <div className="mb-12">
          <div className="relative">
            {/* Progress Bar Background */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
            {/* Active Progress Bar */}
            <div
              className="absolute top-8 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
              style={{
                width: `${(activeStep / (steps.length - 1)) * 100}%`,
              }}
            ></div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = activeStep === index;
                const isCompleted = activeStep > index;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center"
                    style={{ width: `${100 / steps.length}%` }}
                  >
                    {/* Step Circle */}
                    <div
                      className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg"
                          : isActive
                            ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl scale-110"
                            : "bg-white border-4 border-gray-300"
                      }`}
                    >
                      {isCompleted ? (
                        <FaCheckCircle className="text-white text-2xl" />
                      ) : (
                        <StepIcon
                          className={`text-2xl ${
                            isActive ? "text-white" : "text-gray-400"
                          }`}
                        />
                      )}
                    </div>

                    {/* Step Label */}
                    <div className="mt-4 text-center">
                      <p
                        className={`font-semibold text-sm ${
                          isActive || isCompleted
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p
                        className={`text-xs mt-1 hidden sm:block ${
                          isActive || isCompleted
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {isLoading ? (
            <div className="p-8">
              <Skeleton />
            </div>
          ) : errorMessage ? (
            <div className="p-8">
              <ErrorPage message={errorMessage} />
            </div>
          ) : (
            <div className="p-8">
              {/* Step Content */}
              <div className="animate-fadeIn">
                {activeStep === 0 && <AddressInfo address={address} />}
                {activeStep === 1 && <PaymentMethod />}
                {activeStep === 2 && (
                  <OrderSummary
                    totalPrice={totalPrice}
                    cart={cart}
                    address={selectedUserCheckoutAddress}
                    paymentMethod={paymentMethod}
                  />
                )}
                {activeStep === 3 && (
                  <>
                    {paymentMethod === "Stripe" ? (
                      <StripePayment />
                    ) : (
                      <PaypalPayment />
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {!errorMessage && (
          <div className="flex justify-between items-center mt-8 animate-fadeIn">
            <button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeStep === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 shadow-md hover:shadow-lg"
              }`}
            >
              <FaChevronLeft />
              Back
            </button>

            {activeStep !== steps.length - 1 && (
              <button
                disabled={
                  (activeStep === 0 && !selectedUserCheckoutAddress) ||
                  (activeStep === 1 && !paymentMethod)
                }
                onClick={handleNext}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  (activeStep === 0 && !selectedUserCheckoutAddress) ||
                  (activeStep === 1 && !paymentMethod)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                }`}
              >
                Continue
                <FaChevronRight />
              </button>
            )}
          </div>
        )}

        {/* Security Badge */}
        <div className="mt-8 flex justify-center animate-fadeIn">
          <div className="flex items-center gap-3 bg-green-50 px-6 py-3 rounded-xl border border-green-200">
            <FaLock className="text-green-600 text-xl" />
            <div>
              <p className="text-sm font-semibold text-green-900">
                Secure Checkout
              </p>
              <p className="text-xs text-green-700">
                Your information is protected with SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
