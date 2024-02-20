"use client";
import React, { useEffect, useState } from "react";
import Header from "../_components/Header";
import axios from "axios";
import MainCategories from "../_components/MainCategories";
import Categories from "../_components/Categories";

const page = () => {
  const [mainCategory, setMainCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  useEffect(() => {
    fetchMianCategory();
    fetchSubCategory();
  }, []);

  const fetchMianCategory = async () => {
    try {
      const response = await axios.get(
        "http://195.35.28.106:8080/api/v1/public/main/category/all",
        {
          headers: {
            "Accept-Language": "en",
          },
        }
      );
      console.log("success in fetching main Categoryies ", response.data.data);
      setMainCategory(response.data.data.mainCategories);
    } catch (error) {
      console.log("error in fetching main Category", error);
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await axios.get(
        "http://195.35.28.106:8080/api/v1/public/category/all",
        {
          headers: {
            "Accept-Language": "en",
          },
        }
      );
      console.log(
        "success in fetching Sub Categoryies ",
        response.data.data.categories
      );
      setSubCategory(response.data.data.categories);
    } catch (error) {
      console.log("error in fetching Sub Category", error);
    }
  };

  return (
    <div>
      <Header />

      <div className=" mx-auto w-[90%] rounded-2xl bg-slate-300 mt-10 text-center">
        <h3 className="p-3 text-2xl bg-slate-400 w-[300px] rounded-xl mx-auto ">
          ADD MAIN CATEGORY
        </h3>
        <div className="w-[90%] mx-auto mt-8">
          <form action="#" className="space-y-4">
            <div>
              <input
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="Main Category Name"
                type="text"
                id="name"
                // value={productItemData.name}
                // onChange={handleChange}
              />
            </div>

            <div>
              <textarea
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="Description"
                rows="8"
                id="description"
                // value={productItemData.description}
                // onChange={handleChange}
              ></textarea>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="inline-block w-full rounded-lg bg-sky-500 px-5 py-3 font-medium text-white sm:w-auto m-3 "
              >
                Add Category
              </button>

              {/* {allFieldsFilled ? (
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-sky-500 px-5 py-3 font-medium text-white sm:w-auto m-3 "
                >
                  Send Enquiry
                </button>
              ) : (
                <div className="text-red-500 text-xl m-3 p-3 ">
                  <button
                    // type="submit"
                    className="inline-block w-full rounded-lg z-20 bg-sky-500 px-5 py-3 font-medium text-white sm:w-auto m-3 "
                  >
                    Send Enquiry
                  </button>
                </div>
              )} */}
            </div>
          </form>
        </div>
      </div>

      <div className=" mx-auto w-[90%] rounded-2xl bg-slate-300 mt-10 text-center">
        <h3 className="p-3 text-2xl bg-slate-400 w-[300px] rounded-xl mx-auto ">
          ADD SUB CATEGORY
        </h3>
        <div className="w-[90%] mx-auto mt-8">
          <form action="#" className="space-y-4">
            <div>
              <input
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="Category Name"
                type="text"
                id="name"
                // value={productItemData.name}
                // onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="Main Category Id"
                type="text"
                id="name"
                // value={productItemData.name}
                // onChange={handleChange}
              />
            </div>

            <div>
              <textarea
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="Description"
                rows="8"
                id="description"
                // value={productItemData.description}
                // onChange={handleChange}
              ></textarea>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="inline-block w-full rounded-lg bg-sky-500 px-5 py-3 font-medium text-white sm:w-auto m-3 "
              >
                Add Category
              </button>

              {/* {allFieldsFilled ? (
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-sky-500 px-5 py-3 font-medium text-white sm:w-auto m-3 "
                >
                  Send Enquiry
                </button>
              ) : (
                <div className="text-red-500 text-xl m-3 p-3 ">
                  <button
                    // type="submit"
                    className="inline-block w-full rounded-lg z-20 bg-sky-500 px-5 py-3 font-medium text-white sm:w-auto m-3 "
                  >
                    Send Enquiry
                  </button>
                </div>
              )} */}
            </div>
          </form>
        </div>
      </div>

      {/* Main Categories table */}
      <div className="w-[80%] items-center text-center mx-auto mt-15">
        <h2 className="mt-10">Main Categories</h2>

        <MainCategories mainCategory={mainCategory} />
      </div>

      {/* Sub Categories table */}
      <div className="w-[80%] items-center text-center mx-auto mt-15">
        <h2 className="mt-10"> Categories</h2>
      <Categories subCategory={subCategory} />
      </div>
    </div>
  );
};

export default page;
