import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaUserShield } from "react-icons/fa";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { IoExitOutline } from "react-icons/io5";
import BackDrop from "./BackDrop";
import { logoutUser } from "../store/action";

function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAdmin = user && user?.roles.includes("ROLE_ADMIN");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logoutUser(navigate));
  };

  return (
    <div className="relative z-30">
      <div
        onClick={handleClick}
        className="sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
      >
        <Avatar alt="Menu" />
      </div>
      <Menu
        sx={{ width: "400px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
            sx: { width: 160 },
          },
        }}
      >
        <Link to="/profile">
          <MenuItem onClick={handleClose} className="flex gap-2">
            <BiUser className="text-xl" />
            <span className="font-bold text-[16px] mt-1">{user?.username}</span>
          </MenuItem>
        </Link>
        <Link to="/profile/orders">
          <MenuItem onClick={handleClose} className="flex gap-2">
            <HiMiniShoppingCart className="text-xl" />
            <span className="font-semibold">Order</span>
          </MenuItem>
        </Link>
        {isAdmin && (
          <Link to="/admin">
            <MenuItem onClick={handleClose} className="flex gap-2">
              <FaUserShield className="text-xl" />
              <span className="font-semibold">Admin Panel</span>
            </MenuItem>
          </Link>
        )}

        <MenuItem onClick={logoutHandler} className="flex gap-2">
          <div className="font-semibold w-full flex gap-2 items-center bg-button-gradient px-4 py-1 text-white rounded-sm ">
            <IoExitOutline className="text-xl" />
            <span className="font-bold text-[16px] mt-1">Logout</span>
          </div>
        </MenuItem>
      </Menu>

      {open && <BackDrop />}
    </div>
  );
}

export default UserMenu;
