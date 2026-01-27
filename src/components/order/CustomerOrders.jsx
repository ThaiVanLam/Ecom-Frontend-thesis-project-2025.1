import React, { useState } from "react";
import { HiMiniShoppingCart } from "react-icons/hi2";
import OrderTable from "./OrderTable";
import useCustomerOrderFilter from "../../hooks/useCustomerOrderFilter";
import { useSelector } from "react-redux";
import {
  FaBox,
  FaCheckCircle,
  FaClock,
  FaDollarSign,
  FaFilter,
  FaSearch,
  FaShippingFast,
  FaTruck,
} from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Loader from "../../components/shared/Loader";

function CustomerOrders() {
  const { customerOrder, pagination } = useSelector((state) => state.order);
  const { isLoading } = useSelector((state) => state.errors);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useCustomerOrderFilter();

  const emptyOrder = !customerOrder || customerOrder?.length === 0;

  // Calculate statistics
  const stats = React.useMemo(() => {
    if (!customerOrder) return null;

    const totalOrders = customerOrder.length;
    const totalSpent = customerOrder.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );
    const pendingOrders = customerOrder.filter(
      (order) => order.orderStatus === "Pending",
    ).length;
    const completedOrders = customerOrder.filter(
      (order) => order.orderStatus === "Delivered",
    ).length;

    return {
      totalOrders,
      totalSpent,
      pendingOrders,
      completedOrders,
    };
  }, [customerOrder]);

  // Filter orders based on search and status
  const filteredOrders = React.useMemo(() => {
    if (!customerOrder) return [];

    return customerOrder.filter((order) => {
      const matchesSearch =
        searchTerm === "" ||
        order.orderId.toString().includes(searchTerm) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || order.orderStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customerOrder, searchTerm, statusFilter]);

  const statusOptions = [
    "All",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Accepted",
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FaClock className="text-yellow-500" />;
      case "Processing":
        return <FaBox className="text-blue-500" />;
      case "Shipped":
        return <FaTruck className="text-purple-500" />;
      case "Delivered":
        return <FaCheckCircle className="text-green-500" />;
      case "Cancelled":
        return <MdCancel className="text-red-500" />;
      default:
        return <FaShippingFast className="text-indigo-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="lg:px-14 sm:px-8 px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <HiMiniShoppingCart className="text-white text-4xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Orders
              </h1>
              <p className="text-gray-600 mt-1">
                Track and manage all your orders in one place
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Loader text="Loading your orders..." />
        ) : emptyOrder ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-full p-8 shadow-2xl">
                <HiMiniShoppingCart className="text-gray-400 text-8xl" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No Orders Yet
            </h2>
            <p className="text-gray-600 text-lg mb-8 text-center max-w-md">
              Start shopping to see your orders here. We have amazing products
              waiting for you!
            </p>
            <a
              href="/products"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Orders */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-300 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium mb-1">
                        Total Orders
                      </p>
                      <p className="text-3xl font-bold text-gray-800">
                        {stats.totalOrders}
                      </p>
                    </div>
                    <div className="p-4 bg-blue-100 rounded-xl">
                      <HiMiniShoppingCart className="text-blue-600 text-3xl" />
                    </div>
                  </div>
                </div>

                {/* Total Spent */}
                <div
                  className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 transform hover:scale-105 transition-all duration-300 animate-fadeIn"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium mb-1">
                        Total Spent
                      </p>
                      <p className="text-3xl font-bold text-gray-800">
                        ${stats.totalSpent.toFixed(2)}
                      </p>
                    </div>
                    <div className="p-4 bg-green-100 rounded-xl">
                      <FaDollarSign className="text-green-600 text-3xl" />
                    </div>
                  </div>
                </div>

                {/* Pending Orders */}
                <div
                  className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500 transform hover:scale-105 transition-all duration-300 animate-fadeIn"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium mb-1">
                        Pending
                      </p>
                      <p className="text-3xl font-bold text-gray-800">
                        {stats.pendingOrders}
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-xl">
                      <FaClock className="text-yellow-600 text-3xl" />
                    </div>
                  </div>
                </div>

                {/* Completed Orders */}
                <div
                  className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 transform hover:scale-105 transition-all duration-300 animate-fadeIn"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium mb-1">
                        Completed
                      </p>
                      <p className="text-3xl font-bold text-gray-800">
                        {stats.completedOrders}
                      </p>
                    </div>
                    <div className="p-4 bg-purple-100 rounded-xl">
                      <FaCheckCircle className="text-purple-600 text-3xl" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Search and Filter Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by Order ID, Email, or Status..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="md:w-64">
                  <div className="relative">
                    <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 appearance-none cursor-pointer bg-white"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchTerm || statusFilter !== "All") && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-2">
                      Search: "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm("")}
                        className="hover:bg-blue-200 rounded-full p-1 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {statusFilter !== "All" && (
                    <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-2">
                      Status: {statusFilter}
                      <button
                        onClick={() => setStatusFilter("All")}
                        className="hover:bg-purple-200 rounded-full p-1 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Status Legend */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaShippingFast className="text-blue-500" />
                Order Status Guide
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  "Pending",
                  "Processing",
                  "Shipped",
                  "Delivered",
                  "Cancelled",
                  "Accepted",
                ].map((status) => (
                  <div
                    key={status}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {getStatusIcon(status)}
                    <span className="text-sm font-medium text-gray-700">
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Summary */}
            <div className="mb-4">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {filteredOrders.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-800">
                  {customerOrder?.length || 0}
                </span>{" "}
                orders
              </p>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <OrderTable
                customerOrder={filteredOrders}
                pagination={pagination}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CustomerOrders;
