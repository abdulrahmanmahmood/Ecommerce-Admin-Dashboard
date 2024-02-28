"use client";
import React, { useEffect, useState } from "react";
import Header from "../_components/Header";
import axios from "axios";
import { apiUrl } from "../_utilize/axiosClient";
import { useSelector } from "react-redux";
import Users from "./_component/Users";

const page = () => {
  const [customers, setCustomers] = useState([]);
  const [roles, setRoles] = useState([]);

  const token = useSelector((state) => state.token);
  const localToken =
    typeof window !== "undefined" ? localStorage.getItem("localToken") : null;

  typeof window !== "undefined" ? localStorage.getItem("localToken") : null;
  useEffect(() => {
    getAllCoustomer();
    getAllRoles();
  }, []);

  const getAllCoustomer = () => {
    axios
      .get(`${apiUrl}/admin/customer/all`, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log("all users >> ", res.data.data.customers);
        setCustomers(res.data.data.customers);
      })
      .catch((error) => {
        console.log("error in getting all useres ", error);
      });
  };
  const getAllRoles = () => {
    axios
      .get(`${apiUrl}/super/admin/role/all`, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log("all Roles >> ", res.data.data.roles);
        setRoles(res.data.data.roles);
      })
      .catch((error) => {
        console.log("error in getting all useres ", error);
      });
  };

  return (
    <div>
      <Header />
      <div className="w-[90%] m-3 mx-auto items-center">
        <Users customers={customers} roles={roles} getAllCoustomer={getAllCoustomer} />
      </div>
    </div>
  );
};

export default page;
