import { Button } from "@mui/material";
import InputField from "../../../components/shared/InputField";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCategoryFromDashboard,
  addNewProductFromDashboard,
  fetchCategories,
  updateCategoryFromDashboard,
  updateProductFromDashboard,
} from "../../../store/action";
import toast from "react-hot-toast";
import Spinners from "../../../components/shared/Spinners";
import SelectTextField from "../../../components/shared/SelectTextField";
import Skeleton from "../../../components/shared/Skeleton";
import ErrorPage from "../../../components/shared/ErrorPage";

function AddCategoryForm({ setOpen, category, update = false }) {
  const [loader, setLoader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const { categories } = useSelector((state) => state.products);
  const { categoryLoader, errorMessage } = useSelector((state) => state.errors);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const saveCategoryHandler = (data) => {
    if (!update) {
      const sendData = data;
      dispatch(
        addNewCategoryFromDashboard(sendData, toast, reset, setLoader, setOpen)
      );
    } else {
      const sendData = {
        ...data,
        id: category.id,
      };
      dispatch(
        updateCategoryFromDashboard(sendData, toast, reset, setLoader, setOpen)
      );
    }
  };

  useEffect(() => {
    if (update && category) {
      setValue("categoryName", category?.categoryName);
    }
  }, [update, category]);

  useEffect(() => {
    if (!update) {
      dispatch(fetchCategories());
    }
  }, [dispatch, update]);

  useEffect(() => {
    if (!categoryLoader && categories) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, categoryLoader]);

  if (categoryLoader) {
    <Skeleton />;
  }

  if (errorMessage) {
    <ErrorPage message={errorMessage} />;
  }

  return (
    <div className="py-5 relative h-full">
      <form className="space-y-4" onSubmit={handleSubmit(saveCategoryHandler)}>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Category Name"
            required
            id="categoryName"
            type="text"
            message="This field is required*"
            placeholder="Category Name"
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
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddCategoryForm;
