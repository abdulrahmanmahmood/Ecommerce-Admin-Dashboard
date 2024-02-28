import axios from "axios";
import React, { useState } from "react";
import { apiUrl } from "../_utilize/axiosClient";
import { useSelector } from "react-redux";
import { IoMdCloseCircleOutline } from "react-icons/io";

const MainCategories = ({ mainCategory, fetchMianCategory }) => {
  const [showUpdatingForm, setShowUpdatingForm] = useState(false);
  const [showingId, setShowingId] = useState(0);
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });
  const token = useSelector((state) => state.token);
  const localToken =
    typeof window !== "undefined" ? localStorage.getItem("localToken") : null;

  typeof window !== "undefined" ? localStorage.getItem("localToken") : null;

  const handleDeleteCategory = (categoryId) => {
    console.log(categoryId);
    axios
      .delete(`${apiUrl}/admin/main/category/delete/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log("Deleting Main Category Succesfully", res);
        fetchMianCategory();
      })
      .catch((error) => {
        console.log("error in deleteing main Category ", error);
        alert(error.response.data.message);
      });
  };
  const showtheItemUpdatingForm = (categoryId) => {
    setShowUpdatingForm(true);
    setShowingId(categoryId);
  };

  const handleCloseUpdatingForm = () => {
    setShowUpdatingForm(false);
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const updateCategory = (categoryId) => {
    console.log(categoryData);
    axios
      .put(`${apiUrl}/admin/main/category/update/${categoryId}`, categoryData, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log("updating category success", res);
        fetchSubCategory();
        setShowUpdatingForm(false);
      })
      .catch((error) => {
        console.log("error in updating category", error);
      });

    setCategoryData({
      ...categoryData,
      name: "",
      description: "",
    });
  };

  return (
    <div className="overflow-x-auto  mx-auto items-center border-2 my-10 w-full">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Description
            </th>
            <th className="whitespace-nowrap px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {mainCategory.map((category) => (
            <>
              <tr key={category.categoryId}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {category.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {category.description}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <button
                    className="inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
                    onClick={() => showtheItemUpdatingForm(category.categoryId)}
                  >
                    Update
                  </button>
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <button
                    className="inline-block  bg-red-600 rounded-xl px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                    onClick={() => handleDeleteCategory(category.categoryId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              {showingId == category.categoryId && (
                <tr
                  className={
                    showUpdatingForm
                      ? "whitespace-nowrap px-4 py-3 font-medium text-gray-900 items-center "
                      : "hidden"
                  }
                >
                  <td>
                    <input
                      type="text"
                      placeholder="name"
                      className="outline text-center"
                      id="name"
                      value={categoryData.name}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="description"
                      className="outline text-center"
                      id="description"
                      value={categoryData.description}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <button
                      className="bg-sky-500 p-1 rounded-md text-white "
                      onClick={() => updateCategory(category.categoryId)}
                    >
                      Save changes
                    </button>
                  </td>
                  <td className="mr-20 items-center text-center  py-2 text-2xl">
                    <button onClick={handleCloseUpdatingForm}>
                      <IoMdCloseCircleOutline className="text-center items-center" />
                    </button>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainCategories;
