import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { FaKey, FaCheckCircle, FaLockOpen } from "react-icons/fa";
import Spinners from "../shared/Spinners";
import AddressInfoModal from "../checkout/AddressInfoModal";
import { verifyCurrentPassword, changeUserPassword } from "../../store/action";

const inputClass = (hasError) =>
  `px-3 py-2 border outline-none bg-transparent text-slate-800 rounded-md w-full ${
    hasError ? "border-red-500" : "border-slate-300"
  }`;

function ChangePasswordModal({ open, setOpen }) {
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [changing, setChanging] = useState(false);

  const resetAll = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setVerified(false);
    setVerifying(false);
    setChanging(false);
  };

  const closeModal = () => {
    resetAll();
    setOpen(false);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (!currentPassword) return;
    dispatch(
      verifyCurrentPassword(currentPassword, toast, setVerified, setVerifying),
    );
  };

  const handleEditCurrentPassword = () => {
    setVerified(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  const confirmMismatch =
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    newPassword !== confirmPassword;
  const newPasswordTooShort = newPassword.length > 0 && newPassword.length < 6;

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (confirmMismatch || newPasswordTooShort || !newPassword || !confirmPassword) {
      return;
    }
    dispatch(
      changeUserPassword(
        { currentPassword, newPassword, confirmPassword },
        toast,
        closeModal,
        setChanging,
      ),
    );
  };

  return (
    <AddressInfoModal open={open} setOpen={closeModal}>
      <div className="flex items-center gap-2 mb-6 font-semibold text-2xl text-slate-800">
        <FaKey className="text-2xl" />
        Change Password
      </div>

      {/* Step 1: current password verification */}
      <form onSubmit={handleVerify} className="flex flex-col gap-2 mb-6">
        <label className="font-semibold text-sm text-slate-800">
          Current Password
        </label>
        <div className="flex gap-2">
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            disabled={verified}
            placeholder="Enter your current password"
            className={inputClass(false)}
          />
          {!verified ? (
            <button
              type="submit"
              disabled={verifying || !currentPassword}
              className="shrink-0 flex items-center gap-2 text-white bg-custom-blue px-4 py-2 rounded-md disabled:opacity-60"
            >
              {verifying ? (
                <>
                  <Spinners />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEditCurrentPassword}
              className="shrink-0 text-sm text-indigo-600 font-semibold px-2"
            >
              Change
            </button>
          )}
        </div>
        {verified && (
          <div className="flex items-center gap-2 text-green-600 font-semibold text-sm animate-fadeIn">
            <FaCheckCircle />
            Verified
          </div>
        )}
      </form>

      {/* Step 2: new password + confirm, only after verification */}
      {verified && (
        <form
          onSubmit={handleChangePassword}
          className="flex flex-col gap-4 pt-4 border-t border-gray-200 animate-fadeIn"
        >
          <div className="flex items-center gap-2 text-slate-700 text-sm font-semibold">
            <FaLockOpen />
            Set a new password
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm text-slate-800">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 6 characters"
              className={inputClass(newPasswordTooShort)}
            />
            {newPasswordTooShort && (
              <p className="text-sm font-semibold text-red-600">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm text-slate-800">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter the new password"
              className={inputClass(confirmMismatch)}
            />
            {confirmMismatch && (
              <p className="text-sm font-semibold text-red-600">
                Passwords do not match
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={
              changing ||
              !newPassword ||
              !confirmPassword ||
              confirmMismatch ||
              newPasswordTooShort
            }
            className="text-white bg-custom-blue px-4 py-2 rounded-md disabled:opacity-60"
          >
            {changing ? (
              <span className="flex items-center justify-center gap-2">
                <Spinners />
                Changing Password...
              </span>
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      )}
    </AddressInfoModal>
  );
}

export default ChangePasswordModal;
