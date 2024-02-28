import { apiUrl } from "@/app/_utilize/axiosClient";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Users = ({ customers, roles, getAllCoustomer }) => {
  const token = useSelector((state) => state.token);
  const localToken =
    typeof window !== "undefined" ? localStorage.getItem("localToken") : null;
  const [showForm, setShowForm] = useState(false);
  const [UserId, setUserId] = useState();
  const [roleData, setRoleData] = useState({
    role: "",
    customerId: "",
  });
  const handleEnableCustomer = (customerId) => {
    // Logic to enable the customer
    console.log(`Enable customer with ID ${customerId}`);
    axios
      .put(`${apiUrl}/super/admin/customer/enable/${customerId}`, null, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log("set customer enable Success", res);
        getAllCoustomer();
      })
      .catch((error) => {
        console.log("error in set customer enable", error);
      });
  };

  const handleDisableCustomer = (customerId) => {
    // Logic to disable the customer
    console.log(`Disable customer with ID ${customerId}`);
    axios
      .put(`${apiUrl}/super/admin/customer/disable/${customerId}`, null, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log("set customer Disable Success", res);
        getAllCoustomer();
      })
      .catch((error) => {
        console.log("error in set customer Disable", error);
      });
  };

  const handleSetRole = (customerId) => {
    // console.log(`Set role for customer with ID ${customerId}`);
    // console.log("the role data ", roleData);
    const data = { roleData };
    axios
      .put(`${apiUrl}/super/admin/customer/role`, roleData, {
        headers: {
          Authorization: `Bearer ${localToken ? localToken : token}`,
          "Accept-Language": "en",
        },
      })
      .then((res) => {
        console.log("setRole Success", res);
        getAllCoustomer();
        setShowForm(!showForm);
      })
      .catch((error) => {
        console.log("error in set customer role", error);
      });
  };

  const handlShowRoleForm = (customerId) => {
    setShowForm(!showForm);
    setUserId(customerId);
  };
  const handleSelectChange = (e, customerId) => {
    const selectVale = e.target.value;
    console.log(e.target.value);
    setRoleData({
      customerId: customerId,
      role: selectVale,
    });
  };

  return (
    <div>
      {customers.map((customer) => (
        <div
          className="bg-white rounded-lg shadow-md p-4 mb-4 relative"
          key={customer.customerId}
        >
          <div className="font-semibold mb-2 text-lg text-blue-700">
            Customer ID: {customer.customerId}
          </div>
          <div className="text-gray-600 mb-2">Email: {customer.email}</div>

          <div className="text-gray-600 mb-2">
            First Name: {customer.firstName || "Not provided"}
          </div>
          <div className="text-gray-600 mb-2">
            Last Name: {customer.lastName || "Not provided"}
          </div>
          <div className="text-gray-600 mb-2">Phone: {customer.phone}</div>
          <div className="text-gray-600 mb-2">Role: {customer.role}</div>
          {customer.enabled ? (
            <div className="mb-2">
              <span className="text-gray-600 mr-2">Enabled: Yes</span>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                onClick={() => handleDisableCustomer(customer.customerId)}
              >
                Disable Customer
              </button>
            </div>
          ) : (
            <div className="mb-2">
              <span className="text-gray-600 mr-2">Enabled: No</span>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded mr-2"
                onClick={() => handleEnableCustomer(customer.customerId)}
              >
                Enable Customer
              </button>
            </div>
          )}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
            onClick={() => handlShowRoleForm(customer.customerId)}
          >
            Set Role
          </button>
          <div
            className={
              showForm && UserId == customer.customerId
                ? " grid grid-cols-2"
                : "hidden"
            }
          >
            <select
              id={`role-${customer.customerId}`}
              onChange={(e) => handleSelectChange(e, customer.customerId)}
            >
              <option value="">Select role</option>
              {Object.entries(roles).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <button
              className="bg-sky-400 rounded text-white p-2 m-3"
              onClick={() => handleSetRole(customer.customerId)}
            >
              Set This Role
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
