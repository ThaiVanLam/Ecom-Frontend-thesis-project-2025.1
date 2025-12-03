import React from "react";
import { HiMiniShoppingCart } from "react-icons/hi2";
import OrderTable from "./OrderTable";

function Orders() {
  const adminOrders = [
    {
      orderId: 6,
      email: "user1@example.com",
      orderItems: [
        {
          orderItemId: 10,
          product: {
            productId: 2,
            productName: "MSI Katana 15",
            image:
              "http://localhost:8080/product-manager/images/19509340-7a94-484f-b049-34f783f57391.svg",
            description:
              "MSI Katana 15 delivers stunning graphics and high refresh-rate gameplay with the 13th Gen Intel Core i7 and NVIDIA RTX 4060, built for gamers who demand performance and style.",
            quantity: 1,
            price: 3800.0,
            discount: 8.0,
            specialPrice: 3496.0,
          },
          quantity: 1,
          discount: 8.0,
          orderedProductPrice: 3496.0,
        },
        {
          orderItemId: 11,
          product: {
            productId: 3,
            productName: "Dell Latitude 7440",
            image:
              "http://localhost:8080/product-manager/images/d27920eb-c850-4b1c-9ac8-127ad1fd09bb.svg",
            description:
              "The Dell Latitude 7440 is a premium business ultrabook with lightweight design, exceptional durability, and top-tier security features for modern professionals on the move.",
            quantity: 3,
            price: 4200.0,
            discount: 5.0,
            specialPrice: 3990.0,
          },
          quantity: 3,
          discount: 5.0,
          orderedProductPrice: 3990.0,
        },
      ],
      orderDate: "2025-12-02",
      payment: {
        paymentId: 6,
        paymentMethod: "online",
        pgPaymentId: "pi_3SZoTVRym1ydL5BI1ZVeNaZS",
        pgStatus: "succeeded",
        pgResponseMessage: "Payment successful",
        pgName: "Stripe",
      },
      totalAmount: 15466.0,
      orderStatus: "Order Accepted !",
      addressId: 2,
    },
  ];
  const pagination = {
    pageNumber: 0,
    pageSize: 50,
    totalElements: 11,
    totalPages: 1,
    lastPage: true,
  };

  const emptyOrder = !adminOrders || adminOrders?.length === 0;
  return (
    <div className="pb-6 pt-20">
      {emptyOrder ? (
        <div className="flex flex-col items-center justify-center text-gray-600 py-10">
          <HiMiniShoppingCart size={50} className="mb-3" />
          <h2 className="text-2xl font-semibold">No Orders Placed Yet</h2>
        </div>
      ) : (
        <OrderTable adminOrder={adminOrders} pagination={pagination} />
      )}
    </div>
  );
}

export default Orders;
