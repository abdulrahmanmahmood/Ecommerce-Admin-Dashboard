"use client";
import React, { useEffect, useState } from "react";
import Header from "../_components/Header";
import axios from "axios";
import { apiUrl } from "../_utilize/axiosClient";
import { useSelector } from "react-redux";
import Products from "../_components/Products";

const page = () => {
  const token = useSelector((state) => state.token);
  const [allProducts, setAllProducts] = useState([]);

  const [allCategories, setAllCategories] = useState([]);

  const [productItemData, setProductItemData] = useState({
    name: "",
    description: "",
    about: "",
    price: "",
    stockQuantity: "",
    categoryId: "",
    // pictureUrl: "",
    afterDiscount: "",
  });
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  if (typeof window !== "undefined") {
    const localToken = localStorage.getItem("localToken");
  }

  useEffect(() => {
    // Check if all fields are filled whenever productItemData changes
    const filled = Object.values(productItemData).every((val) => val !== "");
    setAllFieldsFilled(filled);
  }, [productItemData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductItemData({ ...productItemData, [id]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!allFieldsFilled) {
      console.error("All fields must be filled");
      alert("All Product filed must be filled ");
      return;
    }
    try {
      axios
        .post(`${apiUrl}/custom/product/new`, productItemData, {
          headers: {
            Authorization: `Bearer ${localToken ? localToken : token}`,
            "Accept-Language": "en",
          },
        })
        .then((res) => {
          console.log("adding successfuly", res);
          setProductItemData({
            name: "",
            description: "",
            about: "",
            price: "",
            stockQuantity: "",
            categoryId: "",
            // pictureUrl: "",
            afterDiscount: "",
          });
        });
    } catch (error) {
      console.error("Error uploading image:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log("Server response:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error setting up request:", error.message);
      }
    }
  };

  const getAllProducts = () => {
    axios
      .get(`${apiUrl}/public/product/all`, {
        headers: {
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log("fetching products successfuly", res.data.data.products);
        setAllProducts(res.data.data.products);
      })
      .catch((error) => {
        console.log("error in fethcing proudcts", error);
      });
  };

  const getAllCategories = () => {};

  return (
    <div className="items-center">
      <div>
        <Header />
      </div>
      <div className=" mx-auto w-[90%] rounded-2xl bg-slate-300 mt-10 text-center">
        <h3 className="p-3 text-2xl bg-slate-400 w-[300px] rounded-xl mx-auto ">
          ADD NEW PRODUCT
        </h3>
        <div className="w-[90%] mx-auto mt-8">
          <form action="#" className="space-y-4" onSubmit={handleAddProduct}>
            <div>
              <input
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="Product Name"
                type="text"
                id="name"
                value={productItemData.name}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div>
                <input
                  className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                  placeholder="Price"
                  type="text"
                  id="price"
                  value={productItemData.price}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                  placeholder="After Discount: -1 for no"
                  type="text"
                  id="afterDiscount"
                  value={productItemData.afterDiscount}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                  placeholder="Stock Quantity"
                  type="number"
                  id="stockQuantity"
                  value={productItemData.stockQuantity}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                  placeholder="Category Id "
                  type="number"
                  id="categoryId"
                  value={productItemData.categoryId}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <input
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="About "
                type="text"
                id="about"
                value={productItemData.about}
                onChange={handleChange}
              />
            </div>

            {/* <div>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="picture Url"
                type="text"
                id="pictureUrl"
                value={productItemData.pictureUrl}
                onChange={handleChange}
              />
            </div> */}

            <div>
              <textarea
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="Description"
                rows="8"
                id="description"
                value={productItemData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mt-4">
              {allFieldsFilled ? (
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
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="w-[90%] mt-10 text-center items-center mx-auto ">
        <Products allProducts={allProducts} getAllProducts={getAllProducts} />
      </div>
    </div>
  );
};

export default page;
