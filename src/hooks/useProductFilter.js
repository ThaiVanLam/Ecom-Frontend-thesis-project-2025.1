import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { dashboardProductsAction, fetchProducts } from "../store/action";

export const useProductFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams();

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", currentPage - 1);

    const sortOrder = searchParams.get("sortby") || "asc";
    const categoryParams = searchParams.get("category") || null;
    const keyword = searchParams.get("keyword") || null;

    // for range
    const minPrice = searchParams.get("minPrice") || null;
    const maxPrice = searchParams.get("maxPrice") || null;

    const brands = searchParams.get("brands") || null;
    const processors = searchParams.get("processors") || null;
    const ram = searchParams.get("ram") || null;
    const storage = searchParams.get("storage") || null;

    params.set("sortBy", "specialPrice");
    params.set("sortOrder", sortOrder);

    if (categoryParams) {
      params.set("category", categoryParams);
    }

    if (keyword) {
      params.set("keyword", keyword);
    }

    // for range
    if (minPrice) {
      params.set("minPrice", minPrice);
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }

    if (brands) {
      params.set("brands", brands);
    }

    if (processors) {
      params.set("processors", processors);
    }

    if (ram) {
      params.set("ram", ram);
    }

    if (storage) {
      params.set("storage", storage);
    }

    const queryString = params.toString();
    console.log("Query string: ", queryString);

    dispatch(fetchProducts(queryString));
  }, [dispatch, searchParams.toString()]);
};

export const useDashboardProductFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles.includes("ROLE_ADMIN");

  useEffect(() => {
    const params = new URLSearchParams();

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", currentPage - 1);

    const queryString = params.toString();

    dispatch(dashboardProductsAction(queryString, isAdmin));
  }, [dispatch, searchParams.toString()]);
};
