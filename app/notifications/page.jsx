import React from "react";
import Header from "../_components/Header";

const page = () => {
  return (
    <div>
      <Header />
      <div className=" mx-auto w-[90%] rounded-2xl bg-slate-300 mt-10 text-center">
        <h3 className="p-3 text-2xl bg-slate-400 w-[300px] rounded-xl mx-auto ">
          NOTIFY ALL CUSTOMERS
        </h3>
        <div className="w-[90%] mx-auto mt-8">
          <form action="#" className="space-y-4">
            <div>
              <textarea
                className="w-full rounded-lg border-gray-200 py-5 mt-2 lg:p-3 px-2 text-sm"
                placeholder="Enter the message "
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
                SEND NOTIFICATION
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
