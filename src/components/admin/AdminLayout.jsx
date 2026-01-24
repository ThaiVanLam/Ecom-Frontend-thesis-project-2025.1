// src/components/admin/AdminLayout.jsx
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import Sidebar from "../shared/Sidebar";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Outlet, useLocation, Link } from "react-router-dom";
import {
  FaBars,
  FaBell,
  FaSearch,
  FaUser,
  FaChevronRight,
  FaStore,
  FaHome,
} from "react-icons/fa";
import { useSelector } from "react-redux";

function AdminLayout() {
  let [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  // Breadcrumb mapping
  const breadcrumbMap = {
    "/admin": "Dashboard",
    "/admin/orders": "Orders",
    "/admin/products": "Products",
    "/admin/categories": "Categories",
    "/admin/sellers": "Sellers",
  };

  const currentPage = breadcrumbMap[location.pathname] || "Dashboard";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <Dialog
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className="relative z-50 xl:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full">
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close Sidebar</span>
                  <RxCross1 className="text-white text-2xl" />
                </button>
              </div>
            </TransitionChild>
            <Sidebar />
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop Sidebar */}
      <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="xl:pl-72">
        {/* Top Navigation Bar */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex h-16 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 xl:hidden"
            >
              <span className="sr-only">Open Sidebar</span>
              <FaBars className="text-gray-600 text-xl" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Admin</span>
              <FaChevronRight className="text-gray-400 text-xs" />
              <span className="text-gray-900 font-semibold">{currentPage}</span>
            </div>

            {/* Spacer */}
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex flex-1"></div>

              {/* Right Section */}
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Back to Store Button */}
                <Link
                  to="/"
                  className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <FaStore className="text-lg" />
                  <span>Back to Store</span>
                </Link>

                {/* Mobile Back Button */}
                <Link
                  to="/"
                  className="lg:hidden flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md"
                  title="Back to Store"
                >
                  <FaHome className="text-lg" />
                </Link>

                {/* Search Button */}
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <FaSearch className="text-lg" />
                </button>

                {/* Notifications */}
                <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <FaBell className="text-lg" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Separator */}
                <div className="hidden lg:block h-6 w-px bg-gray-200" />

                {/* User Menu */}
                <div className="flex items-center gap-3">
                  <div className="hidden lg:block text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.roles?.includes("ROLE_ADMIN")
                        ? "Administrator"
                        : "Seller"}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="bg-gray-50 min-h-[calc(100vh-4rem)]">
          <div className="p-4 sm:p-6 xl:p-8">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {currentPage}
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your {currentPage.toLowerCase()} from here
              </p>
            </div>

            {/* Outlet */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
