import React from "react";

const Categories = ({ subCategory }) => {
  return (
    <div className="overflow-x-auto  mx-auto items-center border-2 my-10">
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
          {subCategory.map((category) => (
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
                onClick={() => handleViewCategory(category)}
              >
                Update
              </button>
            </td>
            <td className="whitespace-nowrap px-4 py-2">
              <button
                className="inline-block  bg-red-600 rounded-xl px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                onClick={() => handleViewCategory(category)}
              >
                Delete
              </button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
