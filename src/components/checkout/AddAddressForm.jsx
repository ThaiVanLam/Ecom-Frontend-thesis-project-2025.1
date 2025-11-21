import { useForm } from "react-hook-form";
import InputField from "../../components/shared/InputField";
import React from "react";
import { FaAddressCard } from "react-icons/fa";
import { useSelector } from "react-redux";
import Spinners from "../../components/shared/Spinners";
import { Link } from "react-router-dom";

function AddAddressForm() {
  const { btnLoader } = useSelector((state) => state.errors);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSaveAddressHandler = async (data) => {
    console.log("login click");
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSaveAddressHandler)} className="">
        <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
          <FaAddressCard className="mr-2 text-2xl" />
          Add Address
        </div>
        <div className="flex flex-col gap-4">
          <InputField
            label="Building Name"
            required
            id="building"
            type="text"
            register={register}
            message="*Building Name is required"
            placeholder="Enter Building Name"
            errors={errors}
          />
          <InputField
            label="City"
            required
            id="city"
            type="text"
            register={register}
            message="*City is required"
            placeholder="Enter City"
            errors={errors}
          />
          <InputField
            label="State"
            required
            id="state"
            type="text"
            register={register}
            message="*State is required"
            placeholder="Enter State"
            errors={errors}
          />
          <InputField
            label="Pincode"
            required
            id="pincode"
            type="text"
            register={register}
            message="*Pincode is required"
            placeholder="Enter Pincode"
            errors={errors}
          />
          <InputField
            label="Street"
            required
            id="street"
            type="text"
            register={register}
            message="*Street is required"
            placeholder="Enter Street"
            errors={errors}
          />
          <InputField
            label="Country"
            required
            id="country"
            type="text"
            register={register}
            message="*Country is required"
            placeholder="Enter Country"
            errors={errors}
          />
        </div>
        <button
          disabled={btnLoader}
          className="text-white bg-custom-blue px-4 py-2 rounded-md mt-4"
          type="submit"
        >
          {btnLoader ? (
            <>
              <Spinners />
              Loading...
            </>
          ) : (
            <>Save</>
          )}
        </button>
      </form>
    </div>
  );
}

export default AddAddressForm;
