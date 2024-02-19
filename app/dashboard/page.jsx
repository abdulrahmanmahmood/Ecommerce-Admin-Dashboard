"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { abiUrl } from "../_utilize/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import Header from "../_components/Header";
import { fetchVisitor } from "../_RTK/slices/visitorSlice";

const page = () => {
  const token = useSelector((state) => state.token);
  const visitor = useSelector((state) => state.visitor);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("token in useEffect ", token);
    if (token !== null) {
      dispatch(fetchVisitor(token)).then(() => {
        console.log("Fetch Visitor successfully!");
      });
    }
  }, [token, dispatch]);

  useEffect(() => {
    console.log("the visitor ", visitor);
  }, [visitor]);

  const language = "en";


  return (
    <div className="overflow-hidden">
      <Header />

      <div className="bg-lime-700  h-[95vh] my-auto">
        <div className=" bg-slate-500 text-white text-center mx-auto items-center my-auto p-5">
          <h1>Welcome</h1>
          <h1> Welcome Mr {  visitor?.firstName ?  visitor?.firstName : <span>VISITOR</span>}</h1>
          
          <h1> Your Role In our ADMIN PANEL IS {visitor?.role}</h1>

          <h1>
            {" "}
            so that{" "}
            {visitor?.role == "SUPER_ADMIN" ? (
              <div>YOU CAN OPEN ALL THE TAPS </div>
            ) : visitor?.role == "ADMIN" ? (
              <div>YOU CAN OPEN ALL THE TAPS EVEN THE USER TAP </div>
            ) : (
              <div>YOU CAN ONLY ONPEN ADVS AND BLOGS</div>
            )}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default page;
