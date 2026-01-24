import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdLaptop } from "react-icons/io";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { TiThMenu } from "react-icons/ti";
import { useSelector } from "react-redux";
import { FaSignInAlt, FaChevronDown } from "react-icons/fa";
import UserMenu from "../../components/UserMenu";

function Navbar() {
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { cart } = useSelector((state) => state.carts);
  const { user } = useSelector((state) => state.auth);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
      fontWeight: "bold",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    },
  }));

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-2xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                <IoMdLaptop className="text-white text-3xl" />
              </div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechZone
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Premium Laptops
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2 rounded-lg font-medium transition-all duration-300 group ${
                  path === link.path
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {path === link.path && (
                  <div className="absolute inset-0 bg-blue-50 rounded-lg"></div>
                )}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Right Section - Cart & Auth */}
          <div className="flex items-center space-x-4">
            {/* Shopping Cart */}
            <Link
              to="/cart"
              className="relative p-3 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 transform hover:scale-110 group"
            >
              <StyledBadge
                badgeContent={cart?.length || 0}
                color="secondary"
                showZero
              >
                <HiMiniShoppingCart className="text-blue-600 text-2xl group-hover:animate-bounce" />
              </StyledBadge>
            </Link>

            {/* User Menu or Login */}
            {user && user.id ? (
              <div className="hidden sm:block">
                <UserMenu />
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <FaSignInAlt className="text-lg" />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="lg:hidden p-3 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
            >
              {navbarOpen ? (
                <RxCross2 className="text-blue-600 text-2xl" />
              ) : (
                <TiThMenu className="text-blue-600 text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out ${
          navbarOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-6 space-y-3">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setNavbarOpen(false)}
              className={`block px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:translate-x-2 animate-fadeIn ${
                path === link.path
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-gray-50 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile User Section */}
          {user && user.id ? (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {user?.username}
                    </p>
                    <p className="text-xs text-gray-600">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setNavbarOpen(false)}
              className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
            >
              <FaSignInAlt className="text-xl" />
              <span>Login to Continue</span>
            </Link>
          )}
        </div>
      </div>

      {/* Animated Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 transform origin-left"></div>
    </nav>
  );
}

export default Navbar;
