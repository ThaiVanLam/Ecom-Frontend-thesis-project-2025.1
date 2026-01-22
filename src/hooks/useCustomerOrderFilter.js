import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getOrdersForCustomer } from "../store/action";

function useCustomerOrderFilter() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const params = new URLSearchParams();

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", currentPage - 1);

    const queryString = params.toString();
    console.log("Query string: ", queryString);

    dispatch(getOrdersForCustomer(queryString));
  }, [dispatch, searchParams.toString()]);
}

export default useCustomerOrderFilter;
