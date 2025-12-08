import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  dashboardCategoriesAction,
  dashboardSellersAction,
} from "../store/action";
import { useEffect } from "react";

export const useDashboardSellerFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams();

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", currentPage - 1);

    const queryString = params.toString();

    dispatch(dashboardSellersAction(queryString));
  }, [dispatch, searchParams.toString()]);
};
