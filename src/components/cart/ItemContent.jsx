import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import {
  decreaseCartQuantity,
  increaseCartQuantity,
  removeFromCart,
} from "../../store/action";
import toast from "react-hot-toast";
import { formatPrice } from "../../utils/formatPrice";
import { truncateText } from "../../utils/truncateText";

function ItemContent({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  cartId,
}) {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const dispatch = useDispatch();

  const handleQtyIncrease = (cartItems) => {
    dispatch(
      increaseCartQuantity(
        cartItems,
        toast,
        currentQuantity,
        setCurrentQuantity,
      ),
    );
  };

  const handleQtyDecrease = (cartItems) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setCurrentQuantity(newQuantity);
      dispatch(decreaseCartQuantity(cartItems, newQuantity));
    }
  };

  const removeItemFromCart = (cartItems) => {
    dispatch(removeFromCart(cartItems, toast));
  };

  const itemTotal = Number(currentQuantity) * Number(specialPrice);
  const itemSavings =
    (Number(price) - Number(specialPrice)) * Number(currentQuantity);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300">
      <div className="grid md:grid-cols-12 gap-4 items-center">
        {/* Product Info - Col 5 */}
        <div className="md:col-span-5 flex gap-4">
          {/* Image */}
          <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-gray-50 rounded-lg overflow-hidden">
            <img
              src={image}
              alt={productName}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1 line-clamp-2">
                {productName}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm line-clamp-2">
                {truncateText(description, 60)}
              </p>
            </div>

            {/* Mobile Price & Remove */}
            <div className="md:hidden flex items-center justify-between mt-3">
              <div className="flex flex-col">
                <span className="font-bold text-blue-600 text-lg">
                  {formatPrice(specialPrice)}
                </span>
                {discount > 0 && (
                  <span className="text-gray-400 text-sm line-through">
                    {formatPrice(price)}
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  removeItemFromCart({
                    image,
                    productName,
                    description,
                    specialPrice,
                    price,
                    productId,
                    quantity,
                  });
                }}
                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <FaTrash size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Price - Desktop Only - Col 2 */}
        <div className="hidden md:flex md:col-span-2 flex-col items-center">
          <span className="font-bold text-blue-600 text-lg">
            {formatPrice(specialPrice)}
          </span>
          {discount > 0 && (
            <span className="text-gray-400 text-sm line-through">
              {formatPrice(price)}
            </span>
          )}
          {discount > 0 && (
            <span className="text-green-600 text-xs font-semibold mt-1">
              Save {discount}%
            </span>
          )}
        </div>

        {/* Quantity - Col 3 */}
        <div className="md:col-span-3 flex justify-center">
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-2">
            <button
              disabled={currentQuantity <= 1}
              onClick={() => {
                handleQtyDecrease({
                  image,
                  productName,
                  description,
                  specialPrice,
                  price,
                  productId,
                  quantity,
                });
              }}
              className={`w-8 h-8 rounded-lg font-bold transition-colors ${
                currentQuantity <= 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              −
            </button>

            <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
              {currentQuantity}
            </span>

            <button
              onClick={() => {
                handleQtyIncrease({
                  image,
                  productName,
                  description,
                  specialPrice,
                  price,
                  productId,
                  quantity,
                });
              }}
              className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Total - Desktop Only - Col 2 */}
        <div className="hidden md:flex md:col-span-2 flex-col items-center">
          <span className="font-bold text-gray-900 text-lg">
            {formatPrice(itemTotal)}
          </span>
          {itemSavings > 0 && (
            <span className="text-green-600 text-xs font-semibold">
              Saved {formatPrice(itemSavings)}
            </span>
          )}
          <button
            onClick={() => {
              removeItemFromCart({
                image,
                productName,
                description,
                specialPrice,
                price,
                productId,
                quantity,
              });
            }}
            className="mt-2 flex items-center gap-2 text-rose-600 hover:text-rose-700 text-sm font-medium transition-colors"
          >
            <FaTrash size={14} />
            Remove
          </button>
        </div>

        {/* Mobile Total */}
        <div className="md:hidden col-span-full flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-gray-600 font-medium">Item Total:</span>
          <div className="text-right">
            <span className="font-bold text-gray-900 text-lg">
              {formatPrice(itemTotal)}
            </span>
            {itemSavings > 0 && (
              <p className="text-green-600 text-xs font-semibold">
                Saved {formatPrice(itemSavings)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemContent;
