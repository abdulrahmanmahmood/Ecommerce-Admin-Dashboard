"use client";
import React, { useEffect, useState } from "react";
import Header from "../_components/Header";
import axios from "axios";
import MainCategories from "../_components/MainCategories";
import Categories from "../_components/Categories";
import { apiUrl } from "../_utilize/axiosClient";
import { useSelector } from "react-redux";

const page = () => {
  const [mainCategory, setMainCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [mainCategorydata, setMainCategorydata] = useState({
    name: "",
    description: "",
  });
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    description: "",
    mainCategoryId: "",
  });
  const token = useSelector((state) => state.token);
  const localToken =
    typeof window !== "undefined" ? localStorage.getItem("localToken") : null;

  typeof window !== "undefined" ? localStorage.getItem("localToken") : null;
  useEffect(() => {
    fetchMianCategory();
    fetchSubCategory();
  }, []);

  const fetchMianCategory = async () => {
    try {
      const response = await axios.get(`${apiUrl}/public/main/category/all`, {
        headers: {
          "Accept-Language": "en",
        },
      });
      console.log("success in fetching main Categoryies ", response.data.data);
      setMainCategory(response.data.data.mainCategories);
    } catch (error) {
      console.log("error in fetching main Category", error);
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await axios.get(`${apiUrl}/public/category/all`, {
        headers: {
          "Accept-Language": "en",
        },
      });
      console.log(
        "success in fetching Sub Categoryies ",
        response.data.data.categories
      );
      setSubCategory(response.data.data.categories);
    } catch (error) {
      console.log("error in fetching Sub Category", error);
    }
  };
  const addMainCategory = (e) => {
    e.preventDefault();

    axios
      .post(`${apiUrl}/admin/main/category/new`, mainCategorydata, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log("succeffully adding main Category ", res);
        setMainCategorydata({
          name: "",
          description: "",
        });
        fetchMianCategory();
      })
      .catch((error) => {
        console.log("error in adding main products", error);
      });
  };
  const addSubCategory = (e) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/admin/category/new`, subCategoryData, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log("succeffully adding sub Category ", res);
        setSubCategoryData({
          name: "",
          description: "",
          mainCategoryId: "",
        });
        fetchSubCategory();
      })
      .catch((error) => {
        console.log("error in adding sub products", error);
      });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setMainCategorydata((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleSubInputChange = (e) => {
    const { id, value } = e.target;
    setSubCategoryData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setSubCategoryData((prevData) => ({
      ...prevData,
      mainCategoryId: value,
    }));
  };

  return (
    <div>
      <Header />

      <div className=" mx-auto w-[90%] rounded-2xl bg-slate-300 mt-10 text-center">
        <h3 className="p-3 text-2xl bg-slate-400 w-[300px] rounded-xl mx-auto ">
          ADD MAIN CATEGORY
        </h3>
        <div className="w-[90%] mx-auto mt-8">
          <form
            action="#"
            className="space-y-4"
            onSubmit={addMainCategory}
            form="mainCategoryForm"
          >
            <div>
              <input
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="Main Category Name"
                type="text"
                id="name"
                value={mainCategorydata.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <textarea
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="Description"
                rows="8"
                id="description"
                value={mainCategorydata.description}
                onChange={handleInputChange}
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
          <form
            action="#"
            className="space-y-4"
            form="subCategoryForm"
            onSubmit={addSubCategory}
          >
            <div>
              <input
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="Category Name"
                type="text"
                id="name"
                value={subCategoryData.name}
                onChange={handleSubInputChange}
              />
            </div>
            <div>
              <select
                name="mainCategoryId"
                id="mainCategoryId"
                value={subCategoryData.mainCategoryId}
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="select the main categories"
                onChange={handleSelectChange}
              >
                <option> select main category</option>

                {mainCategory?.map((item) => (
                  <option value={item.categoryId} key={item.categoryId}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <textarea
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="Description"
                rows="8"
                id="description"
                value={subCategoryData.description}
                onChange={handleSubInputChange}
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
      <div className="w-[95%] items-center text-center mx-auto mt-15">
        <h2 className="mt-10">Main Categories</h2>

        <MainCategories mainCategory={mainCategory} fetchMianCategory={fetchMianCategory}/>
      </div>

      {/* Sub Categories table */}
      <div className="w-[95%] items-center text-center mx-auto mt-15">
        <h2 className="mt-10"> Categories</h2>
        <Categories subCategory={subCategory} fetchSubCategory={fetchSubCategory}/>
      </div>
    </div>
  );
};

export default page;
