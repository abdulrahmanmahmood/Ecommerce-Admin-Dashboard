import React from "react";
import OrdersItems from "./OrdersItems";
import Image from "next/image";
import axios from "axios";
import { apiUrl } from "@/app/_utilize/axiosClient";
import { useSelector } from "react-redux";

const Orders = ({ orders, getAllOrders }) => {
  const token = useSelector((state) => state.token);
  const localToken =
    typeof window !== "undefined" ? localStorage.getItem("localToken") : null;

  const dataToShipped = {
    value: "",
  };
  const dataToDelivery = {
    value: "",
  };

  const moveToShipped = ({ orderId }) => {
    try {
      axios
        .put(`${apiUrl}/delivery/shipped/${orderId}`, dataToShipped, {
          headers: {
            Authorization: `Bearer ${localToken ? localToken : token}`,
            "Accept-Language": "en",
          },
        })
        .then((res) => {
          console.log("successfully move the order to shipped", res);
          getAllOrders();
        })
        .catch((error) => {
          console.log("error in moving order to shipped ", error);
        });
    } catch (error) {
      console.log("error in set the order to shipped ", error);
    }
  };

  const moveToDelivery = ({ orderId }) => {
    try {
      axios
        .put(`${apiUrl}/delivery/delivered/${orderId}`, dataToDelivery, {
          headers: {
            Authorization: `Bearer ${localToken ? localToken : token}`,
            "Accept-Language": "en",
          },
        })
        .then((res) => {
          console.log("successfully move the order to Delivery", res);
          getAllOrders();
        })
        .catch((error) => {
          console.log("error in moving order to Delivery ", error);
        });
    } catch (error) {
      console.log("error in set the order to Delivery ", error);
    }
  };
  const setOutOfDelivery = () => {
    axios
      .put(`${apiUrl}/delivery/out/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log("success to set out for delivery", res);
        getAllOrders();
      })
      .catch((error) => {
        console.log("error in sending order to out for delivery ", error);
      });
  };

  return (
    <div className="">
      {orders.map((order) => (
        <div
          key={order.orderId}
          className="bg-white rounded-lg border-2 mt-2 shadow-md  flex relative"
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">
              Order Id: {order.orderId}
            </h3>
            <p className="text-gray-600 mb-2">
              Order Date: {new Date(order.orderDate).toLocaleString()}
            </p>
            <p className="text-gray-600 mb-2">
              Total Amount: ${order.totalAmount}
            </p>
            <p className="text-gray-600 mb-2">
              Order Status: {order.orderStatus}
            </p>
            <p className="text-gray-600 mb-2">
              Shipment Date: {order.shipmentDate}
            </p>
            <p className="text-gray-600 mb-2">Country: {order.country}</p>
            <p className="text-gray-600 mb-2">City: {order.city}</p>
            <p className="text-gray-600 mb-2">Region: {order.region}</p>
            <p className="text-gray-600 mb-2">Street: {order.street}</p>
            <p className="text-gray-600 mb-2">Zip Code: {order.zipCode}</p>
            <p className="text-gray-600 mb-2">
              Customer Phone: {order.customerPhone}
            </p>
            <div className="text-center">
              <h1 className="text-xl  p-2 ">Order Products</h1>
              {order?.orderItems?.map((item) => (
                <div
                  className="w-full items-center  p-2 text-center "
                  key={item.productId}
                >
                  <OrdersItems item={item} />
                </div>
              ))}
            </div>
          </div>
          {order.orderStatus === "PREPARED" ? (
            <button className="absolute top-2 right-2 items-end bg-[#00CED1] p-2 rounded-xl ml-auto text-white ">
              Move to Shipped
            </button>
          ) : order.orderStatus === "SHIPPED" ? (
            <button className="absolute top-2 right-2 items-end bg-[#32CD32] p-2 rounded-xl ml-auto text-white ">
              Move to Delivery
            </button>
          ) : (
            <button className="absolute top-2 right-2 items-end bg-blue-500 p-2 rounded-xl ml-auto text-white ">
              Out for Delivery
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Orders;
