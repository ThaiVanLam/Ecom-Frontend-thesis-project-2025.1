import React, { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { FaTimes, FaSave, FaCog } from "react-icons/fa";
import InputField from "../shared/InputField";
import { useForm } from "react-hook-form";
import Spinners from "../shared/Spinners";
import api from "../../api/api";
import toast from "react-hot-toast";

function ProductSpecificationModal({ open, setOpen, product, isAdmin }) {
  const [loader, setLoader] = useState(false);
  const [hasExistingSpec, setHasExistingSpec] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  // Fetch existing specification when modal opens
  useEffect(() => {
    const fetchSpecification = async () => {
      if (open && product?.productId) {
        try {
          const { data } = await api.get(
            `/product-manager/api/products/public/${product.productId}/specifications`,
          );

          // Set form values with existing data
          setValue("processor", data.processor || "");
          setValue("ram", data.ram || "");
          setValue("storage", data.storage || "");
          setValue("display", data.display || "");
          setValue("graphics", data.graphics || "");
          setHasExistingSpec(true);
        } catch (error) {
          // Specification doesn't exist yet
          setHasExistingSpec(false);
          // Clear form
          reset();
        }
      }
    };

    fetchSpecification();
  }, [open, product, setValue, reset]);

  const onSubmitHandler = async (data) => {
    try {
      setLoader(true);
      const endpoint = isAdmin ? "admin" : "seller";

      await api.post(
        `/product-manager/api/products/${endpoint}/${product.id}/specifications`,
        data,
      );

      toast.success(
        hasExistingSpec
          ? "Specifications updated successfully"
          : "Specifications added successfully",
      );

      setOpen(false);
      reset();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to save product specifications",
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all w-full max-w-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-white">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <FaCog className="text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      Product Specifications
                    </h2>
                    <p className="text-purple-100 mt-1">
                      {product?.productName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <FaTimes className="text-white text-xl" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmitHandler)} className="p-6">
              <div className="space-y-4">
                {/* Processor */}
                <InputField
                  label="Processor (CPU)"
                  id="processor"
                  type="text"
                  placeholder="e.g., Intel Core i7-13700H (up to 5.0GHz)"
                  register={register}
                  errors={errors}
                />

                {/* RAM */}
                <InputField
                  label="RAM"
                  id="ram"
                  type="text"
                  placeholder="e.g., 16GB DDR5 4800MHz"
                  register={register}
                  errors={errors}
                />

                {/* Storage */}
                <InputField
                  label="Storage"
                  id="storage"
                  type="text"
                  placeholder="e.g., 512GB SSD NVMe PCIe Gen 4"
                  register={register}
                  errors={errors}
                />

                {/* Display */}
                <InputField
                  label="Display"
                  id="display"
                  type="text"
                  placeholder="e.g., 15.6 inch FHD (1920x1080) IPS 144Hz"
                  register={register}
                  errors={errors}
                />

                {/* Graphics */}
                <InputField
                  label="Graphics Card (GPU)"
                  id="graphics"
                  type="text"
                  placeholder="e.g., NVIDIA GeForce RTX 4060 8GB GDDR6"
                  register={register}
                  errors={errors}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={loader}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loader}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loader ? (
                    <>
                      <Spinners />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FaSave />
                      <span>
                        {hasExistingSpec ? "Update" : "Save"} Specifications
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ProductSpecificationModal;
