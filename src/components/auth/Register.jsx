import InputField from "../../components/shared/InputField";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerNewUser } from "../../store/action";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const registerHandler = async (data) => {
    console.log("register click");
    dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
  };
  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <FaUserPlus className="text-slate-800 text-5xl" />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Register Here
          </h1>
        </div>
        <hr className="mt-2 mb-5 text-black" />
        <div className="flex flex-col gap-3">
          <InputField
            label="UserName"
            required
            id="username"
            type="text"
            register={register}
            message="*UserName is required"
            placeholder="Enter your username"
            errors={errors}
          />
          <InputField
            label="Email"
            required
            id="email"
            type="email"
            register={register}
            message="*Email is required"
            placeholder="Enter your email"
            errors={errors}
          />
          <InputField
            label="Password"
            required
            id="password"
            min={6}
            type="password"
            register={register}
            message="*Password is required"
            placeholder="Enter your password"
            errors={errors}
          />
        </div>
        <button
          disabled={loader}
          className="bg-gradient-to-r from-indigo-500 to-emerald-500 flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:from-indigo-400 hover:to-emerald-400 transition-colors duration-100 ease-in-out transform rounded-sm my-3 cursor-pointer rounded-md"
          type="submit"
        >
          {loader ? <>Loading...</> : <>Register</>}
        </button>

        <p className="text-center text-sm text-slate-700 mt-6">
          Already have an account?
          <Link
            className="font-semibold underline hover:text-black"
            to="/login"
          >
            <span> Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
