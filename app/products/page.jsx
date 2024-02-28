"use client";
import React, { useEffect, useState } from "react";
import Header from "../_components/Header";
import axios from "axios";
import { apiUrl } from "../_utilize/axiosClient";
import { useSelector } from "react-redux";
import Products from "../_components/Products";
import { Editor } from "@tinymce/tinymce-react";

const page = () => {
  const token = useSelector((state) => state.token);
  const [allProducts, setAllProducts] = useState([]);
  const localToken =
    typeof window !== "undefined" ? localStorage.getItem("localToken") : null;
  const [allCategories, setAllCategories] = useState([]);
  const [Categories, setCategories] = useState([]);

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
    fetchSubCategory();
  }, []);

  useEffect(() => {
    // Check if all fields are filled whenever productItemData changes
    const filled = Object.values(productItemData).every((val) => val !== "");
    setAllFieldsFilled(filled);
  }, [productItemData]);
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
      setCategories(response.data.data.categories);
    } catch (error) {
      console.log("error in fetching Sub Category", error);
    }
  };

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
          getAllProducts();
        });
    } catch (error) {
      console.log("Error uploading image:", error);
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
  const handleSelectChange = (e) => {
    const { value } = e.target;
    setProductItemData((prevData) => ({
      ...prevData,
      categoryId: value,
    }));
  };

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
                <select
                  name="mainCategoryId"
                  id="mainCategoryId"
                  value={productItemData.categoryId}
                  className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                  placeholder="select the main categories"
                  onChange={handleSelectChange}
                >
                  <option> select main category</option>

                  {Categories?.map((item) => (
                    <option value={item.categoryId} key={item.categoryId}>
                      {item.name}
                    </option>
                  ))}
                </select>
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
              <Editor
                apiKey="i27yyskvsd8log2qv8p7qd6rzwjidv0v1o5ptk0ub65kt8fn"
                value={productItemData.description}
                onEditorChange={(content) =>
                  setProductItemData({
                    ...productItemData,
                    description: content,
                  })
                }
                init={{
                  height: 500,
                  menubar:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss",
                  plugins: [
                    "advlist autolink lists link image",
                    "charmap print preview anchor help",
                    "searchreplace visualblocks code",
                    "insertdatetime media table paste wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic | \
                alignleft aligncenter alignright | \
                bullist numlist outdent indent | help",
                }}
              />
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
        <Products
          allProducts={allProducts}
          getAllProducts={getAllProducts}
          Categories={Categories}
        />
      </div>
    </div>
  );
};

export default page;
