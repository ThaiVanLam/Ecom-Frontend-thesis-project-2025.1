import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdLaptop } from "react-icons/io";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { LiaSignInAltSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { useSelector } from "react-redux";
import { FaSignInAlt } from "react-icons/fa";

function Navbar() {
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { cart } = useSelector((state) => state.carts);
  const { user } = useSelector((state) => state.auth);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <div className="h-[70px] bg-custom-gradient text-white z-50 flex items-center sticky top-0">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
        <Link to="/" className="flex items-center text-2xl font-bold">
          <IoMdLaptop className="mr-2 text-3xl" />
          <span className="font-[Poppins]">TechZone Laptop</span>
        </Link>

        <ul
          className={`flex sm:gap-10 gap-4 sm:items-center  text-slate-800 sm:static absolute left-0 top-[70px] sm:shadow-none shadow-md ${
            navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
          }  transition-all duration-100 sm:h-fit sm:bg-none bg-custom-gradient   text-white sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}
        >
          <li className="font-[500] transition-all duration-150">
            <Link
              className={`${
                path === "/" ? "text-white font-semibold" : "text-gray-200"
              }`}
              to="/"
            >
              Home
            </Link>
          </li>

          <li className="font-[500] transition-all duration-150">
            <Link
              className={`${
                path === "/products"
                  ? "text-white font-semibold"
                  : "text-gray-200"
              }`}
              to="/products"
            >
              Products
            </Link>
          </li>

          <li className="font-[500] transition-all duration-150">
            <Link
              className={`${
                path === "/about" ? "text-white font-semibold" : "text-gray-200"
              }`}
              to="/about"
            >
              About
            </Link>
          </li>

          <li className="font-[500] transition-all duration-150">
            <Link
              className={`${
                path === "/contact"
                  ? "text-white font-semibold"
                  : "text-gray-200"
              }`}
              to="/contact"
            >
              Contact
            </Link>
          </li>

          <li className="font-[500] transition-all duration-150">
            <Link
              className={`${
                path === "/cart" ? "text-white font-semibold" : "text-gray-200"
              }`}
              to="/cart"
            >
              <StyledBadge
                showZero
                badgeContent={cart?.length || 0}
                color="secondary"
                overlap="rectangular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <HiMiniShoppingCart size={25} />
              </StyledBadge>
            </Link>
          </li>
          {user && user.id ? (
            <li className="font-[500] transition-all duration-150">
              <p>Welcome</p>
            </li>
          ) : (
            <li className="font-[500] transition-all duration-150">
              <Link
                className="flex items-center space-x-2 px-4 py-[6px] bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-semibold rounded-md shadow-lg hover:from-indigo-400 hover:to-emerald-400 transition duration-300 ease-in-out transform"
                to="/login"
              >
                <FaSignInAlt size={25} />
                <span>Login</span>
              </Link>
            </li>
          )}
        </ul>
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center sm:mt-0 mt-2"
        >
          {navbarOpen ? (
            <RxCross2 className="text-white text-3xl" />
          ) : (
            <TiThMenu className="text-white text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
