import React from "react";

const Reports = ({ allReports }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {allReports.map((report) => (
        <div
          key={report.reportId}
          className="bg-white rounded-lg shadow-md p-4"
        >
          <h3 className="text-lg font-semibold mb-2">
            Report ID: {report.reportId}
          </h3>
          <p className="text-gray-600 mb-2">Customer ID: {report.customerId}</p>
          <p className="text-gray-600 mb-2">Product ID: {report.productId}</p>
          <p className="text-gray-600 mb-2">
            Report Date: {new Date(report.reportDate).toLocaleString()}
          </p>
          <p className="text-gray-600 mb-2">Report Type: {report.reportType}</p>
          <p className="text-gray-600 mb-2">
            Reported Customer ID: {report.reportedCustomerId}
          </p>
          <p className="text-gray-600 mb-2">Review ID: {report.reviewId}</p>
        </div>
      ))}
    </div>
  );
};

export default Reports;
