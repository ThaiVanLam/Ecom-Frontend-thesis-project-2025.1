import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
import Spinners from "../../components/shared/Spinners";
import { updateOrderStatusFromCustomer } from "../../store/action";

const ORDER_STATUSES = ["Cancelled"];

function UpdateOrderForm({
  setOpen,
  selectedId,
  selectedItem,
  loader,
  setLoader,
}) {
  const [orderStatus, setOrderStatus] = useState(
    selectedItem?.status || "Cancelled",
  );

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const updateOrderStatus = (e) => {
    e.preventDefault();
    if (!orderStatus) {
      setError("Order status is required");
      return;
    }
    dispatch(
      updateOrderStatusFromCustomer(selectedId, orderStatus, toast, setLoader),
    );
  };

  return (
    <div className="py-5 relative h-full">
      <form className="space-y-4" onSubmit={updateOrderStatus}>
        <FormControl fullWidth variant="outlined" error={!!error}>
          <InputLabel id="order-status-label">Order Status</InputLabel>
          <Select
            labelId="order-status-label"
            label="Order Status"
            value={orderStatus}
            onChange={(e) => {
              setOrderStatus(e.target.value);
              setError("");
            }}
          >
            {ORDER_STATUSES.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>

          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>

        <div className="flex w-full justify-between items-center absolute bottom-14">
          <Button
            disabled={loader}
            onClick={() => setOpen(false)}
            variant="outlined"
            className="text-white py-[10px] px-4 text-sm font-medium"
          >
            Cancel
          </Button>
          <Button
            disabled={loader}
            type="submit"
            variant="contained"
            color="primary"
            className="bg-custom-blue text-white py-[10px] px-4 text-sm font-medium"
          >
            {loader ? (
              <div className="flex gap-2 items-center">
                <Spinners /> Loading...
              </div>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateOrderForm;
