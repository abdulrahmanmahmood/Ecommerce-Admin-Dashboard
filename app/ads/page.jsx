"use client";
import React, { useState } from "react";
import Header from "../_components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiUrl } from "../_utilize/axiosClient";

const Page = () => {
  const token = useSelector((state) => state.token);
  const localToken =
    typeof window !== "undefined" ? localStorage.getItem("localToken") : null;

  // Define state variables for form fields
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [targetUrl, setTargetUrl] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data object to send to the endpoint
    const data = {
      title: title,
      description: description,
      targetUrl: targetUrl,
      startDate: `${startDate}T11:11:00`,
      endDate: `${endDate}T11:11:00`,
    };
    console.log("data to send ", data);

    // Send data to the endpoint
    axios
      .post(`${apiUrl}/custom/advertisement/new`, data, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log("Successfully added advertisement", res);
        // Reset form fields
        setTitle("");
        setStartDate("");
        setEndDate("");
        setDescription("");
        setTargetUrl("");
      })
      .catch((error) => {
        console.log("Error in adding advertisement", error);
      });
  };

  return (
    <div>
      <Header />
      <div className="mx-auto w-[90%] rounded-2xl bg-slate-300 mt-10 text-center">
        <h3 className="p-3 text-2xl w-[30%] bg-slate-400 rounded-xl mx-auto">
          ADD NEW ADVERTISEMENT
        </h3>
        <div className="w-[90%] mx-auto mt-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <input
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Start Date */}
            <div>
              <label
                htmlFor="start-date"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                id="start-date"
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* End Date */}
            <div>
              <label
                htmlFor="end-date"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                id="end-date"
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <textarea
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="Description"
                rows="8"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Target URL */}
            <div>
              <input
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="Target URL"
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
              />
            </div>

            {/* Submit button */}
            <div className="mt-4">
              <button
                type="submit"
                className="inline-block w-full rounded-lg bg-sky-500 px-5 py-3 font-medium text-white sm:w-auto m-3"
              >
                Add Advertisement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
