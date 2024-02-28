"use client";
import React, { useEffect, useState } from "react";
import Header from "../_components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiUrl } from "../_utilize/axiosClient";
import Reports from "./_component/Reports";

const page = () => {
  const [allReports, SetAllReports] = useState([]);
  const token = useSelector((state) => state.token);
  const localToken =
    typeof window !== "undefined" ? localStorage.getItem("localToken") : null;
  useEffect(() => {
    getAllReports();
  }, []);

  const getAllReports = () => {
    axios
      .get(`${apiUrl}/admin/report/all`, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log("fetching Reports successfuly", res.data.data.reports);
        SetAllReports(res.data.data.reports);
      })
      .catch((error) => {
        console.log("error in fethcing reports", error);
      });
  };

  return (
    <div>
      <Header />
      Reaports Page
      <Reports allReports={allReports} />
    </div>
  );
};

export default page;
