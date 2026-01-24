// src/components/shared/Sidebar.jsx
import React from "react";
import { FaTachometerAlt, FaChevronRight, FaStore } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { adminNavigation, sellerNavigation } from "../../utils";
import classNames from "classnames";

function Sidebar({ isProfileLayout = false }) {
  const pathName = useLocation().pathname;
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  const sideBarLayout = isAdmin ? adminNavigation : sellerNavigation;

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 px-6 pb-4">
      {/* Logo Section */}
      <div className="flex h-20 shrink-0 items-center gap-x-3 pt-6 border-b border-gray-700 pb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
          <FaTachometerAlt className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-white text-xl font-bold">
            {isAdmin ? "Admin Panel" : "Seller Panel"}
          </h1>
          <p className="text-gray-400 text-xs">
            {isAdmin ? "Full Access" : "Limited Access"}
          </p>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold truncate">
              {user?.username}
            </p>
            <p className="text-gray-400 text-xs truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-2">
          <li>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Navigation
            </p>
            <ul role="list" className="space-y-1">
              {sideBarLayout.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={classNames(
                      pathName === item.href
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white",
                      "group flex items-center justify-between gap-x-3 rounded-xl p-3 text-sm font-semibold leading-6 transition-all duration-200",
                    )}
                  >
                    <div className="flex items-center gap-x-3">
                      <item.icon
                        className={classNames(
                          pathName === item.href
                            ? "text-white"
                            : "text-gray-400 group-hover:text-white",
                          "text-xl transition-colors",
                        )}
                      />
                      <span>{item.name}</span>
                    </div>
                    {pathName === item.href && (
                      <FaChevronRight className="text-white text-sm" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Stats Section */}
          <li className="mt-auto">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Quick Stats
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Today's Sales</span>
                  <span className="text-white font-semibold">$1,234</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">New Orders</span>
                  <span className="text-green-400 font-semibold">+12</span>
                </div>
              </div>
            </div>
          </li>

          {/* Back to Store Button */}
          <li>
            <Link
              to="/"
              className="group flex items-center justify-center gap-x-3 rounded-xl p-4 text-sm font-semibold leading-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaStore className="text-xl" />
              <span>Back to Store</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-700 pt-4">
        <p className="text-xs text-gray-500 text-center">
          © 2024 TechZone Laptop
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
