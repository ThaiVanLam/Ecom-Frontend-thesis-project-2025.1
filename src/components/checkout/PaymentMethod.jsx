import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod, createUserCart } from "../../store/action";
import {
  FaCreditCard,
  FaPaypal,
  FaLock,
  FaCheckCircle,
  FaCcStripe,
} from "react-icons/fa";
import { SiStripe } from "react-icons/si";

function PaymentMethod() {
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector((state) => state.payment);
  const { cart, cartId } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  useEffect(() => {
    if (cart.length > 0 && !cartId && !errorMessage) {
      const sendCartItems = cart.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      });
      dispatch(createUserCart(sendCartItems));
    }
  }, [dispatch, cartId]);

  const paymentMethodHandler = (method) => {
    dispatch(addPaymentMethod(method));
  };

  const paymentOptions = [
    {
      value: "Stripe",
      label: "Credit/Debit Card",
      icon: SiStripe,
      description: "Pay securely with your credit or debit card via Stripe",
      available: true,
      badge: "Recommended",
    },
    {
      value: "Paypal",
      label: "PayPal",
      icon: FaPaypal,
      description: "Pay with your PayPal account",
      available: false,
      badge: "Coming Soon",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto min-h-[500px] animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
          <FaCreditCard className="text-white text-4xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Select Payment Method
        </h2>
        <p className="text-gray-600">
          Choose your preferred way to complete the payment
        </p>
      </div>

      {/* Payment Options */}
      <div className="space-y-4">
        {paymentOptions.map((option, index) => {
          const Icon = option.icon;
          const isSelected = paymentMethod === option.value;
          const isAvailable = option.available;

          return (
            <div
              key={option.value}
              onClick={() => isAvailable && paymentMethodHandler(option.value)}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-102 animate-fadeIn ${
                isSelected
                  ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl"
                  : isAvailable
                    ? "border-gray-200 bg-white hover:border-blue-300 shadow-md hover:shadow-lg"
                    : "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                {/* Radio Button */}
                <div className="flex items-center h-6 mt-1">
                  <Radio
                    checked={isSelected}
                    disabled={!isAvailable}
                    value={option.value}
                    sx={{
                      color: isSelected ? "#3b82f6" : "#9ca3af",
                      "&.Mui-checked": {
                        color: "#3b82f6",
                      },
                    }}
                  />
                </div>

                {/* Icon */}
                <div
                  className={`p-4 rounded-xl ${
                    isSelected
                      ? "bg-gradient-to-br from-blue-500 to-purple-600"
                      : isAvailable
                        ? "bg-gray-100"
                        : "bg-gray-200"
                  } transition-all duration-300`}
                >
                  <Icon
                    className={`text-3xl ${
                      isSelected ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {option.label}
                    </h3>
                    {option.badge && (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isAvailable
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {option.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {option.description}
                  </p>

                  {/* Security Badge */}
                  {isAvailable && (
                    <div className="flex items-center gap-2 text-sm">
                      <FaLock className="text-green-600" />
                      <span className="text-green-700 font-medium">
                        Secure Payment
                      </span>
                    </div>
                  )}
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-full">
                      <FaCheckCircle className="text-xl" />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Accent Line */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-500 to-purple-600"
                    : ""
                }`}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Security Note */}
      <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <FaLock className="text-green-600 text-2xl" />
          </div>
          <div>
            <h4 className="font-bold text-green-900 mb-2">
              Your payment is secure
            </h4>
            <p className="text-green-700 text-sm">
              All transactions are encrypted and secured with industry-standard
              SSL technology. We never store your payment information on our
              servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
