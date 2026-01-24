import { FaAddressBook, FaPlus } from "react-icons/fa";
import Skeleton from "../../components/shared/Skeleton";
import React, { useState } from "react";
import AddressInfoModal from "./AddressInfoModal";
import AddAddressForm from "./AddAddressForm";
import { useDispatch, useSelector } from "react-redux";
import AddressList from "./AddressList";
import { DeleteModal } from "./DeleteModal";
import toast from "react-hot-toast";
import { deleteUserAddress } from "../../store/action";

function AddressInfo({ address }) {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const addNewAddressHandler = () => {
    setSelectedAddress("");
    setOpenAddressModal(true);
  };

  const dispatch = useDispatch();

  const deleteAddressHandler = () => {
    dispatch(
      deleteUserAddress(toast, selectedAddress?.addressId, setOpenDeleteModal),
    );
  };

  const noAddressExist = !address || address.length === 0;

  const { isLoading, btnLoader } = useSelector((state) => state.errors);

  return (
    <div className="min-h-[500px]">
      {noAddressExist ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 animate-fadeIn">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-12 shadow-2xl border-4 border-gray-100">
              <FaAddressBook className="text-gray-400 text-7xl" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            No Delivery Address
          </h2>
          <p className="text-gray-600 text-lg mb-8 text-center max-w-md">
            Add your delivery address to continue with your order
          </p>

          <button
            onClick={addNewAddressHandler}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <FaPlus className="text-xl group-hover:rotate-90 transition-transform duration-300" />
            Add Delivery Address
          </button>
        </div>
      ) : (
        /* Address List */
        <div className="animate-fadeIn">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <FaAddressBook className="text-blue-600" />
                Select Delivery Address
              </h2>
              <p className="text-gray-600 mt-1">
                Choose where you want your order delivered
              </p>
            </div>

            <button
              onClick={addNewAddressHandler}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <FaPlus />
              Add New
            </button>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton />
            </div>
          ) : (
            <div className="space-y-4">
              <AddressList
                addresses={address}
                setSelectedAddress={setSelectedAddress}
                setOpenAddressModal={setOpenAddressModal}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            </div>
          )}
        </div>
      )}

      <AddressInfoModal open={openAddressModal} setOpen={setOpenAddressModal}>
        <AddAddressForm
          address={selectedAddress}
          setOpenAddressModal={setOpenAddressModal}
        />
      </AddressInfoModal>

      <DeleteModal
        open={openDeleteModal}
        loader={btnLoader}
        setOpen={setOpenDeleteModal}
        title="Delete Address"
        onDeleteHandler={deleteAddressHandler}
      />
    </div>
  );
}

export default AddressInfo;
