import React, { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { FaTimes, FaSave, FaCog, FaChevronDown } from "react-icons/fa";
import InputField from "../shared/InputField";
import { useForm } from "react-hook-form";
import Spinners from "../shared/Spinners";
import api from "../../api/api";
import toast from "react-hot-toast";

// Danh sách options giống như trong advance filter
const PROCESSOR_OPTIONS = [
  "Intel Core i3",
  "Intel Core i5",
  "Intel Core i7",
  "Intel Core i9",
  "AMD Ryzen 3",
  "AMD Ryzen 5",
  "AMD Ryzen 7",
  "AMD Ryzen 9",
  "Apple M1",
  "Apple M2",
  "Apple M3",
];

const RAM_OPTIONS = ["4GB", "8GB", "16GB", "32GB", "64GB"];

const STORAGE_OPTIONS = ["128GB", "256GB", "512GB", "1TB", "2TB"];

function ProductSpecificationModal({ open, setOpen, product, isAdmin }) {
  const [loader, setLoader] = useState(false);
  const [hasExistingSpec, setHasExistingSpec] = useState(false);

  // State cho các select box
  const [selectedProcessor, setSelectedProcessor] = useState("");
  const [selectedRAM, setSelectedRAM] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");

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
          setSelectedProcessor(data.processor || "");
          setSelectedRAM(data.ram || "");
          setSelectedStorage(data.storage || "");
          setValue("display", data.display || "");
          setValue("graphics", data.graphics || "");
          setHasExistingSpec(true);
        } catch (error) {
          // Specification doesn't exist yet
          setHasExistingSpec(false);
          // Clear form
          reset();
          setSelectedProcessor("");
          setSelectedRAM("");
          setSelectedStorage("");
        }
      }
    };

    fetchSpecification();
  }, [open, product, setValue, reset]);

  const onSubmitHandler = async (data) => {
    try {
      setLoader(true);
      const endpoint = isAdmin ? "admin" : "seller";

      const requestData = {
        processor: selectedProcessor,
        ram: selectedRAM,
        storage: selectedStorage,
        display: data.display,
        graphics: data.graphics,
      };

      await api.post(
        `/product-manager/api/products/${endpoint}/${product.id}/specifications`,
        requestData,
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
                {/* Processor Select */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-semibold text-sm text-slate-800">
                    Processor (CPU)
                  </label>
                  <div className="relative">
                    <select
                      value={selectedProcessor}
                      onChange={(e) => setSelectedProcessor(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 appearance-none cursor-pointer bg-white"
                    >
                      <option value="">Select Processor</option>
                      {PROCESSOR_OPTIONS.map((processor) => (
                        <option key={processor} value={processor}>
                          {processor}
                        </option>
                      ))}
                    </select>
                    <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* RAM Select */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-semibold text-sm text-slate-800">
                    RAM
                  </label>
                  <div className="relative">
                    <select
                      value={selectedRAM}
                      onChange={(e) => setSelectedRAM(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 appearance-none cursor-pointer bg-white"
                    >
                      <option value="">Select RAM</option>
                      {RAM_OPTIONS.map((ram) => (
                        <option key={ram} value={ram}>
                          {ram}
                        </option>
                      ))}
                    </select>
                    <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Storage Select */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-semibold text-sm text-slate-800">
                    Storage
                  </label>
                  <div className="relative">
                    <select
                      value={selectedStorage}
                      onChange={(e) => setSelectedStorage(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 appearance-none cursor-pointer bg-white"
                    >
                      <option value="">Select Storage</option>
                      {STORAGE_OPTIONS.map((storage) => (
                        <option key={storage} value={storage}>
                          {storage}
                        </option>
                      ))}
                    </select>
                    <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Display - Text Input */}
                <InputField
                  label="Display"
                  id="display"
                  type="text"
                  placeholder="e.g., 15.6 inch FHD (1920x1080) IPS 144Hz"
                  register={register}
                  errors={errors}
                />

                {/* Graphics - Text Input */}
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
