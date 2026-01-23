import React from "react";
import {
  FaBuilding,
  FaEdit,
  FaMapMarkerAlt,
  FaStreetView,
  FaTrash,
} from "react-icons/fa";
import { MdLocationCity, MdPinDrop, MdPublic } from "react-icons/md";

function AddressCard({ address, onEdit, onDelete }) {
  return (
    <div className="relative p-5 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all duration-300 bg-white group animate-fadeIn">
      {/* Header with building name and actions */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FaBuilding className="text-blue-600 text-lg" />
          </div>
          <h4 className="font-bold text-gray-900 text-lg">
            {address.buildingName}
          </h4>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={onEdit}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 transform hover:scale-110"
            title="Edit Address"
          >
            <FaEdit size={18} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 transform hover:scale-110"
            title="Delete Address"
          >
            <FaTrash size={18} />
          </button>
        </div>
      </div>

      {/* Address details */}
      <div className="space-y-3">
        {/* Street */}
        <div className="flex items-start gap-3">
          <FaStreetView className="text-gray-400 text-lg mt-0.5 flex-shrink-0" />
          <p className="text-gray-700">{address.street}</p>
        </div>

        {/* City, State, Pincode */}
        <div className="flex items-start gap-3">
          <MdLocationCity className="text-gray-400 text-lg mt-0.5 flex-shrink-0" />
          <p className="text-gray-700">
            {address.city}, {address.state} - {address.pincode}
          </p>
        </div>

        {/* Country */}
        <div className="flex items-start gap-3">
          <MdPublic className="text-gray-400 text-lg mt-0.5 flex-shrink-0" />
          <p className="text-gray-700 font-medium">{address.country}</p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

export default AddressCard;
