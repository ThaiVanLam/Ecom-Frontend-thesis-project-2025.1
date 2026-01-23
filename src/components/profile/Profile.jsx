import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../../store/action";
import api from "../../api/api";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEdit,
  FaPlus,
  FaShieldAlt,
} from "react-icons/fa";
import { HiMiniShoppingCart } from "react-icons/hi2";
import AddressInfoModal from "../checkout/AddressInfoModal";
import AddAddressForm from "../checkout/AddAddressForm";
import AddressCard from "../shared/AddressCard";
import { DeleteModal } from "../checkout/DeleteModal";
import toast from "react-hot-toast";
import { deleteUserAddress } from "../../store/action";
import Skeleton from "../shared/Skeleton";
import { Link } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const { user, address } = useSelector((state) => state.auth);
  const { isLoading, btnLoader } = useSelector((state) => state.errors);

  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  const [addressValueChange, setAddressValueChange] = useState(address);

  useEffect(() => {
    setAddressValueChange(address);
  }, [address]);

  const addNewAddressHandler = () => {
    setSelectedAddress("");
    setOpenAddressModal(true);
  };

  const deleteAddressHandler = async () => {
    try {
      dispatch({ type: "BUTTON_LOADER" });

      // Xóa address từ API
      await api.delete(
        `/user-manager/api/addresses/${selectedAddress?.addressId}`,
      );

      // ✅ Fetch lại danh sách addresses - React sẽ tự động re-render
      // Nếu addresses = [] thì sẽ hiển thị empty state
      dispatch(getUserAddresses());

      // Đóng modal
      setOpenDeleteModal(false);

      // Clear selected address
      setSelectedAddress("");

      // Hiển thị thông báo
      toast.success("Address deleted successfully");

      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error?.response?.data?.message || "Failed to delete address");
      dispatch({ type: "IS_ERROR" });
    }
  };

  const getRoleDisplay = (roles) => {
    if (roles?.includes("ROLE_ADMIN")) return "Admin";
    if (roles?.includes("ROLE_SELLER")) return "Seller";
    return "Customer";
  };

  const getRoleBadgeColor = (roles) => {
    if (roles?.includes("ROLE_ADMIN")) return "bg-purple-100 text-purple-800";
    if (roles?.includes("ROLE_SELLER")) return "bg-blue-100 text-blue-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">
            Manage your account information and addresses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
              {/* Card Header with Gradient */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8 text-white">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <FaUser className="text-5xl text-indigo-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{user?.username}</h2>
                  <div
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${getRoleBadgeColor(
                      user?.roles,
                    )}`}
                  >
                    <div className="flex items-center gap-2">
                      <FaShieldAlt />
                      {getRoleDisplay(user?.roles)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-6 py-6 space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FaEnvelope className="text-xl text-indigo-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <p className="text-gray-900 break-all">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FaUser className="text-xl text-indigo-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">User ID</p>
                    <p className="text-gray-900">#{user?.id}</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Link
                      to="/profile/orders"
                      className="flex items-center justify-between p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <HiMiniShoppingCart className="text-xl text-indigo-600" />
                        <span className="text-gray-700 font-medium">
                          My Orders
                        </span>
                      </div>
                      <span className="text-indigo-600">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Addresses Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Addresses Header */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-white">
                    <FaMapMarkerAlt className="text-2xl" />
                    <h2 className="text-2xl font-bold">Saved Addresses</h2>
                  </div>
                  <button
                    onClick={addNewAddressHandler}
                    className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-md"
                  >
                    <FaPlus />
                    Add New
                  </button>
                </div>
                <p className="text-blue-100 mt-2">
                  Manage your delivery addresses
                </p>
              </div>

              {/* Addresses Body */}
              <div className="p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton />
                  </div>
                ) : !addressValueChange || addressValueChange.length === 0 ? (
                  <div className="text-center py-12 animate-fadeIn">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full mb-6 animate-bounce-slow">
                      <FaMapMarkerAlt className="text-5xl text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      No Addresses Added
                    </h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                      Add your first delivery address to get started with
                      seamless ordering
                    </p>
                    <button
                      onClick={addNewAddressHandler}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <FaPlus />
                      Add Your First Address
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {address.map((addr, index) => (
                        <div
                          key={addr.addressId}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <AddressCard
                            address={addr}
                            onEdit={() => {
                              setSelectedAddress(addr);
                              setOpenAddressModal(true);
                            }}
                            onDelete={() => {
                              setSelectedAddress(addr);
                              setOpenDeleteModal(true);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
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

export default Profile;
