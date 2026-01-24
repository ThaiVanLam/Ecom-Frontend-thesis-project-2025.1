import React from "react";
import {
  FaBuilding,
  FaCheckCircle,
  FaEdit,
  FaStreetView,
  FaTrash,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdLocationCity, MdPinDrop, MdPublic } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectUserCheckoutAddress } from "../../store/action";

function AddressList({
  addresses,
  setSelectedAddress,
  setOpenAddressModal,
  setOpenDeleteModal,
}) {
  const dispatch = useDispatch();
  const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

  const onEditButtonHandler = (addresses) => {
    setSelectedAddress(addresses);
    setOpenAddressModal(true);
  };

  const onDeleteButtonHandler = (addresses) => {
    setSelectedAddress(addresses);
    setOpenDeleteModal(true);
  };

  const handleAddressSelection = (addresses) => {
    dispatch(selectUserCheckoutAddress(addresses));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {addresses.map((address, index) => {
        const isSelected =
          selectedUserCheckoutAddress?.addressId === address.addressId;

        return (
          <div
            key={address.addressId}
            onClick={() => handleAddressSelection(address)}
            className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 animate-fadeIn ${
              isSelected
                ? "bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-500 shadow-xl"
                : "bg-white border-2 border-gray-200 hover:border-blue-300 shadow-md hover:shadow-lg"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Selected Badge */}
            {isSelected && (
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg animate-fadeIn">
                <FaCheckCircle />
                <span className="text-sm font-bold">Selected</span>
              </div>
            )}

            {/* Header with Building Name */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-xl ${
                    isSelected
                      ? "bg-gradient-to-br from-blue-500 to-purple-600"
                      : "bg-gray-100 group-hover:bg-blue-100"
                  } transition-all duration-300`}
                >
                  <FaBuilding
                    className={`text-xl ${
                      isSelected ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>
                <h4 className="font-bold text-lg text-gray-900">
                  {address.buildingName}
                </h4>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditButtonHandler(address);
                  }}
                  className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors duration-200 transform hover:scale-110"
                  title="Edit Address"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteButtonHandler(address);
                  }}
                  className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors duration-200 transform hover:scale-110"
                  title="Delete Address"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>

            {/* Address Details */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FaStreetView className="text-gray-400 text-lg mt-1 flex-shrink-0" />
                <p className="text-gray-700">{address.street}</p>
              </div>

              <div className="flex items-start gap-3">
                <MdLocationCity className="text-gray-400 text-lg mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  {address.city}, {address.state}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <MdPinDrop className="text-gray-400 text-lg mt-1 flex-shrink-0" />
                <p className="text-gray-700 font-medium">{address.pincode}</p>
              </div>

              <div className="flex items-start gap-3">
                <MdPublic className="text-gray-400 text-lg mt-1 flex-shrink-0" />
                <p className="text-gray-700 font-semibold">{address.country}</p>
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-300 ${
                isSelected
                  ? "bg-gradient-to-r from-blue-500 to-purple-600"
                  : "bg-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400"
              }`}
            ></div>
          </div>
        );
      })}
    </div>
  );
}

export default AddressList;
