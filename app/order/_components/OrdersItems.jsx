import React from "react";
import Image from "next/image";

const OrdersItems = ({ item }) => {
  return (
    <div className=" items-center border-b border-gray-200 py-2 px-2 w-[80%] text-center outline-doublen mx-auto">
    <div
      href="#"
      className="  overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 hover:border-gray-200 transition duration-300 bg-white shadow-lg"
    >
      <div className="sm:flex sm:justify-between sm:gap-4">
        <div className="flex items-center">
          <div className="w-20 h-20 relative mr-4">
            <img
              src={item.pictureUrl}
              alt="Product Image"
              className="rounded-lg object-cover shadow-sm"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
            <p className="text-gray-600">
              {item.quantity} x ${item.unitPrice}
            </p>
          </div>
        </div>
        <div className="hidden sm:block sm:shrink-0">
          <p className="font-semibold text-gray-800">${item.totalPrice}</p>
          <h2 className="text-gray-600">Product ID: {item.productId}</h2>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default OrdersItems;
