import { FaAddressBook } from "react-icons/fa";
import Skeleton from "../../components/shared/Skeleton";
import React from "react";

function AddressInfo() {
  const noAddressExist = true;
  const isLoading = false;
  return (
    <div className="pt-4">
      {noAddressExist ? (
        <div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center">
          <FaAddressBook size={50} className="text-gray-500 mb-4" />
          <h1 className="text-slate-900 text-center font-semibold text-2xl mb-2">
            No Address Added Yet
          </h1>
          <p className="text-slate-800 text-center mb-6">
            Please add your address to complete purchase
          </p>
        </div>
      ) : (
        <div className="relative p-6 rounded-lg max-w-md mx-auto">
          <h1 className="text-slate-800 text-center font-bold text-2xl">
            Select Address
          </h1>
          {isLoading ? (
            <div className="py-4 px-8">
              <Skeleton />
            </div>
          ) : (
            <div className="space-y-4 pt-6">
              <p>Address list here...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddressInfo;
