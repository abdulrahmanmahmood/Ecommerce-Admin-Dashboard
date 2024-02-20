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
  const localToken = typeof window !== 'undefined' ? localStorage.getItem("localToken") : null;
  const [shippedOrders, setShippedOrders] = useState([]);
  useEffect(() => {
    getShippedOrders();
  }, []);

  const getShippedOrders = () => {
    axios
      .get(`${apiUrl}/delivery/prepared`, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log(
          "fetching getShippedOrders successfuly",
          res.data.data.products
        );
        setShippedOrders(res.data.data);
      })
      .catch((error) => {
        console.log("error in fethcing getShippedOrders", error);
      });
  };
  return (
    <div>
      <Header />

      <h2 className="text-2xl text-center items-center m-3 ">Shipped Orders</h2>
      <Orders orders={orders} />
    </div>
  );
};

export default page;
