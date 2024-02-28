"use client";
import React, { useEffect, useState } from "react";
import Header from "../_components/Header";
import Orders from "./_components/Orders";
import { orders } from "./_components/shippedOrders";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiUrl } from "../_utilize/axiosClient";

const page = () => {
  const token = useSelector((state) => state.token);
  const localToken =
    typeof window !== "undefined" ? localStorage.getItem("localToken") : null;
  const [shippedOrders, setShippedOrders] = useState([]);
  const [preparedOrders, setPreparedOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  useEffect(() => {
    getShippedOrders();
    getPreparedOrders();
    getDeliveredOrders();
  }, []);
  const getAllOrders = () => {
    getShippedOrders();
    getPreparedOrders();
    getDeliveredOrders();
  };

  const getShippedOrders = () => {
    axios
      .get(`${apiUrl}/delivery/shipped`, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log(
          "fetching getShippedOrders successfuly",
          res.data.data.orders
        );
        setShippedOrders(res.data.data.orders);
      })
      .catch((error) => {
        console.log("error in fethcing getShippedOrders", error);
      });
  };
  const getPreparedOrders = () => {
    axios
      .get(`${apiUrl}/delivery/prepared`, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log(
          "fetching getPreparedOrders successfuly",
          res.data.data.orders
        );
        setPreparedOrders(res.data.data.orders);
      })
      .catch((error) => {
        console.log("error in fethcing getPreparedOrders", error);
      });
  };
  const getDeliveredOrders = () => {
    axios
      .get(`${apiUrl}/delivery/out`, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log(
          "fetching getDeliveredOrders successfuly",
          res.data.data.orders
        );
        setDeliveredOrders(res.data.data.orders);
      })
      .catch((error) => {
        console.log("error in fethcing getDeliveredOrders", error);
      });
  };
  return (
    <div className="items-cetner  text-center">
      <Header />
      <div className="w-full mx-auto lg:w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Prepared Orders */}
        <div>
          <h2 className="text-2xl text-center m-5 bg-[#FFD700] border-2 shadow-md rounded-2xl p-4 ">
            Prepared Orders
          </h2>
          {preparedOrders.length > 0 ? (
            <Orders orders={preparedOrders} getAllOrder={getAllOrders} />
          ) : (
            <h2 className="text-center">There are no prepared orders yet</h2>
          )}
        </div>

        {/* Shipped Orders */}
        <div>
          <h2 className="text-2xl text-center m-5 bg-[#00CED1] border-2 shadow-md rounded-2xl p-4 ">
            Shipped Orders
          </h2>
          {shippedOrders.length > 0 ? (
            <Orders orders={shippedOrders} getAllOrder={getAllOrders} />
          ) : (
            <h2 className="text-center">There are no shipped orders yet</h2>
          )}
        </div>

        {/* Delivered Orders */}
        <div>
          <h2 className="text-2xl text-center m-5 bg-[#32CD32] border-2 shadow-md rounded-2xl p-4 ">
            Delivered Orders
          </h2>
          {deliveredOrders.length > 0 ? (
            <Orders orders={deliveredOrders} getAllOrder={getAllOrders} />
          ) : (
            <h2 className="text-center">There are no delivered orders yet</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
