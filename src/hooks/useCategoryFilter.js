import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { dashboardCategoriesAction } from "../store/action";
import { useEffect } from "react";

export const useDashboardCategoryFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams();

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", currentPage - 1);

    const queryString = params.toString();

    dispatch(dashboardCategoriesAction(queryString));
  }, [dispatch, searchParams.toString()]);
};
