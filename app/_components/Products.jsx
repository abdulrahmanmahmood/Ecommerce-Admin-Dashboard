"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { apiUrl } from "../_utilize/axiosClient";
import { useSelector } from "react-redux";
import { IoMdCloseCircleOutline } from "react-icons/io";
import ProductDescription from "./ProductDescription";

const Products = ({ allProducts, getAllProducts, Categories }) => {
  const token = useSelector((state) => state.token);
  const [showInputForProductId, setShowInputForProductId] = useState("");
  const [showFormForUpdateProduc, setShowFormForUpdateProduc] = useState("");
  const [closeInput, setCloseInput] = useState(false);
  const localToken =
    typeof window !== "undefined" ? localStorage.getItem("localToken") : null;
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
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

  const handleDeleteImage = (productId, imageIndex) => {
    axios
      .delete(
        `${apiUrl}/custom/product/picture/delete/${productId}/${imageIndex}`,
        {
          headers: {
            Authorization: `Bearer ${localToken ? localToken : token}`,
            "Accept-Language": "en",
          },
        }
      )
      .then((res) => {
        console.log("Deleted Product Image Successfully ", res.data);
        getAllProducts();
      })
      .catch((error) => {
        console.log("Error in deleting product image ", error);
      });
  };
  useEffect(() => {
    console.log("localToken", localToken);
  }, [localToken]);

  const handleAddProductImage = (productId) => {
    setShowInputForProductId(productId);
    setCloseInput(false);
  };

  const handleCahngeInput = (e) => {
    console.log("file selected ", e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadImage = (e, productId) => {
    e.preventDefault();
    if (!selectedFile) {
      console.error("No file selected");
      alert("Not Selected File");
      return;
    }
    if (selectedFile.size > 30 * 1024) {
      // 30 KB limit
      console.log("File size exceeds 30 KB");
      alert("File size exceeds 30 KB");
      return;
    } else {
      const formData = new FormData();
      formData.append("image", selectedFile);
      axios
        .put(
          `${apiUrl}/custom/product/picture/add/${productId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localToken ? localToken : token}`,
              // "Accept-Language": "en",
            },
          }
        )
        .then((res) => {
          console.log("succesuflly upload image", res);
          getAllProducts();
          setCloseInput(true);
        })
        .catch((error) => {
          console.log("error in upload image ", error);
        });
    }

    console.log("selected file ", selectedFile);
  };

  const handleCloseInput = () => {
    setCloseInput(true);
  };

  const handleShowForm = (productId) => {
    setShowUpdateForm(true);
    setShowFormForUpdateProduc(productId);
  };

  const handleCloseUpdatingForm = () => {
    setShowFormForUpdateProduc(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductItemData({ ...productItemData, [id]: value });
    console.log("product item after update", productItemData);
  };

  const handleSavingEdition = (e, productId) => {
    e.preventDefault();

    handleUpdateProduct(productId);
  };

  const handleUpdateProduct = (productId) => {
    try {
      axios
        .put(`${apiUrl}/custom/product/update/${productId}`, productItemData, {
          headers: {
            Authorization: `Bearer ${localToken ? localToken : token}`,
            "Accept-Language": "en",
          },
        })
        .then((res) => {
          console.log("Updating Product successfuly", res);
          getAllProducts();
          setShowFormForUpdateProduc(false);
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
  const handleSelectChange = (e) => {
    const { value } = e.target;
    setProductItemData((prevData) => ({
      ...prevData,
      categoryId: value,
    }));
  };
  return (
    <>
      {allProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white p-4 rounded-lg shadow-md grid grid-cols-1 relative lg:grid-cols-2 m-3 border border-collapse h-[1200px] md:h-[1200px] lg:h-[500px] my-5 items-center text-center"
        >
          <div className="grid grid-cols-2 gap-x-2 gap-y-2 content-between">
            {/* Displaying product images */}
            {product.pictures.map((url, index) => (
              <div
                key={index}
                className="w-[150px] h-[150px] bg-green-700 rounded items-center relative"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={url}
                    width={150}
                    height={140}
                    alt={`product image ${index + 1}`}
                    className="rounded outline-dashed"
                  />
                </div>
                <div
                  className="absolute bottom-0 left-0 w-full h-8 bg-red-600 rounded-2xl text-white text-center flex justify-center items-center cursor-pointer"
                  onClick={() => handleDeleteImage(product.productId, index)}
                >
                  Delete Image
                </div>
              </div>
            ))}

            {/* Rendering placeholder div for empty image slots */}
            {product.pictures.length < 5 && (
              <div
                className="w-[150px] h-[150px] bg-slate-500 items-center relative cursor-pointer"
                onClick={() => handleAddProductImage(product.productId)}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="text-white ">Upload Image</span>
                  <IoCloudUploadOutline className="items-center text-center text-3xl text-white mx-auto" />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center mt-4 content-between gap-5">
            <h2 className=" font-bold text-2xl mx-3">Name: {product.name}</h2>
            <div className="grid lg:grid-cols-3 grid-cols-1 m-3 text-xl">
              <p className="text-gray-700">Price: {product.price}</p>
              <p className="text-gray-700">
                Price after discount: {product.afterDiscount}
              </p>
              <p className="text-gray-700">
                Stock Quantity: {product.stockQuantity}
              </p>
            </div>
            <div className="m-3">
            <ProductDescription editedDescription={product.description} />
              <p className="w-full text-lg m-2">About {product.about}</p>
            </div>

            {/* <div
              className="w-[80%] mx-auto h-[80px]  pt-[25px] bg-red-600 rounded-2xl cursor-pointer text-center text-white items-center "
              onClick={() => handleDeleteProduct(product.productId)}
            >
              Delete Product
            </div> */}
            <div
              className="w-[80%] mx-auto h-[80px]  pt-[25px] bg-blue-600 rounded-2xl cursor-pointer text-center text-white items-center "
              onClick={() => handleShowForm(product.productId)}
            >
              Update Product
            </div>
          </div>

          {/* Conditional rendering for the input div */}
          {showInputForProductId === product.productId && (
            <div
              className={`${
                closeInput ? "hidden" : "absolute"
              } absolute mx-auto my-auto p-5 items-center text-center border border-collapse rounded-2xl bg-slate-200 shadow-2xl text-blue-700 flex flex-col gap-4 mt-[10%] lg:mt-0 lg:ml-[10%] lg:px-10 xl:px-20 `}
            >
              <form
                onSubmit={(e) => handleUploadImage(e, product.productId)}
                className=""
              >
                <input
                  type="file"
                  className="lg:w-[80%] w-[50%] p-3 m-3 items-center text-center grid grid-cols-1 lg:grid-row-2 "
                  onChange={handleCahngeInput}
                />
                <button
                  type="submit"
                  className="p-2 m-4 bg-blue-400 text-white text-center rounded-xl"
                >
                  Upload this image{" "}
                </button>
              </form>
              <div
                className="absolute top-5 right-5 text-3xl text-black"
                onClick={() => {
                  handleCloseInput();
                }}
              >
                <IoMdCloseCircleOutline />
              </div>
            </div>
          )}

          {showUpdateForm && showFormForUpdateProduc === product.productId && (
            <div className=" items-center text-center lg:right-20 absolute w-full lg:w-[90%] shadow-2xl h-[80%] my-auto  lg:h-auto">
              <div
                className="absolute top-2 right-2 text-3xl text-black "
                onClick={() => {
                  handleCloseUpdatingForm();
                }}
              >
                <IoMdCloseCircleOutline />
              </div>
              <form
                action="#"
                className="space-y-4  w-full bg-slate-100 rounded-3xl mr-3 my-auto px-8 p-20  lg:py-4 text-center items-center  lg:h-auto"
                onSubmit={(e) => handleSavingEdition(e, product.productId)}
              >
                <div>
                  <input
                    className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2  text-sm"
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
                      className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2  text-sm"
                      placeholder="Price"
                      type="text"
                      id="price"
                      value={productItemData.price}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <input
                      className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2  text-sm"
                      placeholder="After Discount: -1 for no"
                      type="text"
                      id="afterDiscount"
                      value={productItemData.afterDiscount}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <input
                      className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2  text-sm"
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
                    className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2  text-sm"
                    placeholder="About "
                    type="text"
                    id="about"
                    value={productItemData.about}
                    onChange={handleChange}
                  />
                </div>

                {/* <div>
                    <input
                      className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2  text-sm"
                      placeholder="picture Url"
                      type="text"
                      id="pictureUrl"
                      value={productItemData.pictureUrl}
                      onChange={handleChange}
                    />
                  </div> */}

                <div>
                  <textarea
                    className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2  text-sm"
                    placeholder="Description"
                    rows="8"
                    id="description"
                    value={productItemData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-blue-600 px-5 py-7 lg:py-3 font-medium text-white sm:w-auto"
                  >
                    save
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Products;
