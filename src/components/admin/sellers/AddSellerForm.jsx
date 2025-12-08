import { Button } from "@mui/material";
import InputField from "../../shared/InputField";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProductFromDashboard,
  addNewSellerFromDashboard,
  fetchCategories,
  fetchSellers,
  updateProductFromDashboard,
} from "../../../store/action";
import toast from "react-hot-toast";
import Spinners from "../../shared/Spinners";
import SelectTextField from "../../shared/SelectTextField";
import Skeleton from "../../shared/Skeleton";
import ErrorPage from "../../shared/ErrorPage";

function AddSellerForm({ setOpen, seller, update = false }) {
  const [loader, setLoader] = useState(false);

  const { sellers } = useSelector((state) => state.auth);
  const { errorMessage } = useSelector((state) => state.errors);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const saveSellerHandler = (data) => {
    if (!update) {
      const sendData = {
        ...data,
        roles: ["seller"],
      };
      dispatch(
        addNewSellerFromDashboard(sendData, toast, reset, setLoader, setOpen)
      );
    }
  };

  useEffect(() => {
    if (!update) {
      dispatch(fetchSellers());
    }
  }, [dispatch, update]);

  if (errorMessage) {
    <ErrorPage message={errorMessage} />;
  }

  return (
    <div className="py-5 relative h-full">
      <form className="space-y-4" onSubmit={handleSubmit(saveSellerHandler)}>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Username"
            required
            id="username"
            type="text"
            message="This field is required*"
            placeholder="Enter your username"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Email"
            required
            id="email"
            type="text"
            message="This field is required*"
            placeholder="Enter your email"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Password"
            required
            id="password"
            type="text"
            message="This field is required*"
            placeholder="Enter your password"
            register={register}
            errors={errors}
          />
        </div>

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
              "Add New Seller"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddSellerForm;
