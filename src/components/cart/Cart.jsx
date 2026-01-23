import React, { useEffect } from "react";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { MdShoppingCartCheckout, MdArrowBack } from "react-icons/md";
import {
  FaShieldAlt,
  FaTruck,
  FaPercent,
  FaLock,
  FaBoxOpen,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ItemContent from "./ItemContent";
import { fetchProducts } from "../../store/action";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";

function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.carts);
  const { products } = useSelector((state) => state.products);
  const newCart = { ...cart };

  // Fetch products nếu chưa có
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts(""));
    }
  }, [dispatch, products]);

  newCart.totalPrice = cart?.reduce(
    (acc, cur) => acc + Number(cur?.specialPrice) * Number(cur?.quantity),
    0,
  );

  if (!cart || cart.length === 0) {
    return <CartEmpty />;
  }

  const shipping = 0; // Free shipping
  const estimatedTax = newCart.totalPrice * 0.0; // 0% tax
  const totalAmount = newCart.totalPrice + shipping + estimatedTax;
  const savings = cart?.reduce(
    (acc, cur) =>
      acc +
      (Number(cur?.price) - Number(cur?.specialPrice)) * Number(cur?.quantity),
    0,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto lg:px-14 sm:px-8 px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <HiMiniShoppingCart className="text-white text-4xl" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Shopping Cart
                </h1>
                <p className="text-gray-600 mt-1">
                  {cart.length} {cart.length === 1 ? "item" : "items"} in your
                  cart
                </p>
              </div>
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              <MdArrowBack size={20} />
              Continue Shopping
            </Link>
          </div>

          {/* Benefits Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaTruck className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  Free Shipping
                </p>
                <p className="text-xs text-gray-600">On all orders</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaShieldAlt className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Warranty</p>
                <p className="text-xs text-gray-600">1 Year coverage</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaLock className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  Secure Payment
                </p>
                <p className="text-xs text-gray-600">100% Protected</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FaPercent className="text-orange-600 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  Best Deals
                </p>
                <p className="text-xs text-gray-600">Great prices</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Table Header - Desktop Only */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 rounded-xl font-semibold text-gray-700">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {cart &&
                cart.length > 0 &&
                cart.map((item, i) => (
                  <div
                    key={i}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <ItemContent {...item} />
                  </div>
                ))}
            </div>

            {/* Mobile Continue Shopping */}
            <Link
              to="/products"
              className="md:hidden flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-semibold py-4 transition-colors"
            >
              <MdArrowBack size={20} />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 sticky top-4">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-t-2xl">
                <h2 className="text-2xl font-bold">Order Summary</h2>
              </div>

              {/* Summary Details */}
              <div className="p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">
                    Subtotal ({cart.length} items)
                  </span>
                  <span className="font-semibold">
                    {formatPrice(newCart?.totalPrice)}
                  </span>
                </div>

                {/* Savings */}
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="font-medium flex items-center gap-2">
                      <FaPercent className="text-sm" />
                      You Save
                    </span>
                    <span className="font-semibold">
                      -{formatPrice(savings)}
                    </span>
                  </div>
                )}

                {/* Shipping */}
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium flex items-center gap-2">
                    <FaTruck className="text-green-600" />
                    Shipping
                  </span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>

                {/* Tax */}
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Estimated Tax</span>
                  <span className="font-semibold">
                    {formatPrice(estimatedTax)}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4"></div>

                {/* Total */}
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-blue-600 text-2xl">
                    {formatPrice(totalAmount)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link to="/checkout" className="block">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                    <MdShoppingCartCheckout size={24} />
                    Proceed to Checkout
                  </button>
                </Link>

                {/* Security Note */}
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <FaLock className="text-green-600" />
                  <span>Secure checkout - SSL encrypted</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-blue-50 px-6 py-4 rounded-b-2xl border-t border-blue-100">
                <div className="flex items-start gap-3">
                  <FaBoxOpen className="text-blue-600 text-xl mt-1 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900 mb-1">
                      Fast & Secure Delivery
                    </p>
                    <p className="text-gray-600">
                      All products are carefully packaged and delivered with
                      tracking
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 text-center">
                Why Shop With Us?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-lg">✓</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    100% Authentic Products
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-lg">✓</span>
                  </div>
                  <p className="text-sm text-gray-700">30-Day Return Policy</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-lg">✓</span>
                  </div>
                  <p className="text-sm text-gray-700">24/7 Customer Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
