import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { authenticateSigninUser } from "../../store/action";
import toast from "react-hot-toast";
import Spinners from "../../components/shared/Spinners";

function Login() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const loginHandler = async (data) => {
    console.log("login click");
    dispatch(authenticateSigninUser(data, toast, reset, navigate, setLoader));
  };
  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <AiOutlineLogin className="text-slate-800 text-5xl" />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Login Here
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
            label="Password"
            required
            id="password"
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
          {loader ? (
            <>
              <Spinners />
              Loading...
            </>
          ) : (
            <>Login</>
          )}
        </button>

        <p className="text-center text-sm text-slate-700 mt-6">
          Don't have an account?
          <Link
            className="font-semibold underline hover:text-black"
            to="/register"
          >
            <span> SignUp</span>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
