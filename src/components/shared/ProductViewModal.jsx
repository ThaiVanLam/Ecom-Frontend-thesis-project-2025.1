import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import Status from "./Status";
import { MdClose, MdDone } from "react-icons/md";
import {
  FaBox,
  FaCog,
  FaMemory,
  FaMicrochip,
  FaSave,
  FaTimes,
  FaTv,
} from "react-icons/fa";
import api from "../../api/api";
import Loader from "./Loader";

export default function ProductViewModal({
  open,
  setOpen,
  product,
  isAvailable,
  isFromPanel = false,
}) {
  const {
    id,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
  } = product;

  const [specifications, setSpecifications] = useState(null);
  const [loadingSpecs, setLoadingSpecs] = useState(false);
  const [specsError, setSpecsError] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [mouseY, setMouseY] = useState(0);

  // Fetch specifications when modal opens
  useEffect(() => {
    const fetchSpecifications = async () => {
      if (open && id) {
        try {
          setLoadingSpecs(true);
          setSpecsError(null);
          const { data } = await api.get(
            `/product-manager/api/products/public/${id}/specifications`,
          );
          setSpecifications(data);
        } catch (error) {
          if (error.response?.status === 404) {
            setSpecsError("No specifications available");
          } else {
            setSpecsError("Failed to load specifications");
          }
          setSpecifications(null);
        } finally {
          setLoadingSpecs(false);
        }
      }
    };

    fetchSpecifications();
  }, [open, id]);

  // Handle mouse movement to show/hide header
  useEffect(() => {
    if (!open) return;

    const handleMouseMove = (e) => {
      setMouseY(e.clientY);

      // Show header when mouse is near top (within 100px)
      if (e.clientY < 100) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [open]);

  // Reset header visibility when modal closes
  useEffect(() => {
    if (!open) {
      setShowHeader(true);
    }
  }, [open]);

  if (isFromPanel) {
    isAvailable = quantity && Number(quantity) > 0;
  }

  const specificationItems = [
    {
      icon: FaMicrochip,
      label: "Processor",
      value: specifications?.processor,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FaMemory,
      label: "RAM",
      value: specifications?.ram,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FaSave,
      label: "Storage",
      value: specifications?.storage,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FaTv,
      label: "Display",
      value: specifications?.display,
      color: "from-orange-500 to-red-500",
    },
    {
      icon: FaCog,
      label: "Graphics",
      value: specifications?.graphics,
      color: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <>
      <Dialog
        open={open}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setOpen(false)}
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all w-full max-w-4xl"
            >
              {/* Close Button - with smooth fade animation */}
              <div
                className={`absolute top-0 right-0 left-0 z-20 transition-all duration-500 ease-in-out ${
                  showHeader
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-full opacity-0 pointer-events-none"
                }`}
              >
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setOpen(false)}
                    className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors transform hover:scale-110 duration-200"
                  >
                    <FaTimes className="text-gray-600 text-xl" />
                  </button>
                </div>

                {/* Gradient overlay for better visibility */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
              </div>

              {/* Hover indicator when header is hidden */}
              <div
                className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ${
                  showHeader ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Product Image */}
              {image && (
                <div className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="flex justify-center items-center py-8 px-4">
                    <img
                      src={image}
                      alt={productName}
                      className="max-h-80 object-contain rounded-lg shadow-md"
                    />
                  </div>
                </div>
              )}

              {/* Product Details */}
              <div className="px-6 pt-6 pb-4">
                <DialogTitle
                  as="h1"
                  className="text-3xl font-bold text-gray-900 mb-4"
                >
                  {productName}
                </DialogTitle>

                {product.sku && (
                  <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg mb-4">
                    <span className="text-sm font-semibold text-gray-600">
                      SKU:
                    </span>
                    <span className="text-sm font-mono font-bold text-blue-600">
                      {product.sku}
                    </span>
                  </div>
                )}

                {product.brand && (
                  <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg mb-4 ml-2">
                    <span className="text-sm font-semibold text-gray-600">
                      Brand:
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {product.brand}
                    </span>
                  </div>
                )}

                {/* Price and Stock */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {specialPrice ? (
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 line-through text-lg">
                          ${Number(price).toFixed(2)}
                        </span>
                        <span className="text-3xl font-bold text-blue-600">
                          ${Number(specialPrice).toFixed(2)}
                        </span>
                        {discount > 0 && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            Save {discount}%
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-3xl font-bold text-blue-600">
                        ${Number(price).toFixed(2)}
                      </span>
                    )}
                  </div>
                  {isAvailable ? (
                    <Status
                      text="In Stock"
                      icon={MdDone}
                      bg="bg-green-100"
                      color="text-green-700"
                    />
                  ) : (
                    <Status
                      text="Out of Stock"
                      icon={MdClose}
                      bg="bg-red-100"
                      color="text-red-700"
                    />
                  )}
                </div>

                <Divider className="my-4" />

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{description}</p>
                </div>

                {/* Specifications Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <FaCog className="text-white text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Technical Specifications
                    </h3>
                  </div>

                  {loadingSpecs ? (
                    <div className="flex justify-center py-8">
                      <Loader text="Loading specifications..." />
                    </div>
                  ) : specsError ? (
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <p className="text-gray-500">{specsError}</p>
                    </div>
                  ) : specifications ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {specificationItems.map(
                        (spec, index) =>
                          spec.value && (
                            <div
                              key={index}
                              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow duration-300"
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`p-3 bg-gradient-to-br ${spec.color} rounded-lg flex-shrink-0`}
                                >
                                  <spec.icon className="text-white text-xl" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                    {spec.label}
                                  </p>
                                  <p className="text-gray-900 font-medium break-words">
                                    {spec.value}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ),
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <FaBox className="text-gray-400 text-4xl mx-auto mb-3" />
                      <p className="text-gray-500">
                        No specifications available for this product
                      </p>
                    </div>
                  )}
                </div>

                {/* Stock Info */}
                {isFromPanel && (
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center gap-3">
                      <FaBox className="text-blue-600 text-xl" />
                      <div>
                        <p className="text-sm font-semibold text-blue-900">
                          Quantity Available
                        </p>
                        <p className="text-blue-700 font-medium">
                          {quantity} units in stock
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex gap-4 px-6 py-4 bg-gray-50 border-t border-gray-200 justify-end">
                <button
                  className="px-6 py-3 text-sm font-semibold border-2 border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 rounded-xl transition-all duration-300"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
