import React from "react";
import { HiMiniShoppingCart } from "react-icons/hi2";
import OrderTable from "./OrderTable";
import useCustomerOrderFilter from "../../hooks/useCustomerOrderFilter";
import { useSelector } from "react-redux";

function CustomerOrders() {
  const { customerOrder, pagination } = useSelector((state) => state.order);

  useCustomerOrderFilter();

  const emptyOrder = !customerOrder || customerOrder?.length === 0;

  return (
    <div className="lg:px-14 sm:px-8 px-4">
      <div className="py-5">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-slate-800 text-4xl font-bold">My Orders</h1>
          <span className="text-slate-700">
            View and manage all your orders in one place.
          </span>
        </div>
        <div className="pb-6 pt-20">
          {emptyOrder ? (
            <div className="flex flex-col items-center justify-center text-gray-600 py-10">
              <HiMiniShoppingCart size={50} className="mb-3" />
              <h2 className="text-2xl font-semibold">No Orders Placed Yet</h2>
            </div>
          ) : (
            <OrderTable customerOrder={customerOrder} pagination={pagination} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerOrders;
