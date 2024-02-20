import React from 'react'

const Orders = ({orders}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {orders.map(order => (
    <div key={order.orderId} className="bg-white rounded-lg overflow-hidden shadow-md">
      <img src={order.orderItems[0].pictureUrl} alt={order.orderItems[0].productName} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{order.orderItems[0].productName}</h3>
        <p className="text-gray-600 mb-2">Order Date: {new Date(order.orderDate).toLocaleString()}</p>
        <p className="text-gray-600 mb-2">Total Amount: ${order.totalAmount}</p>
        <p className="text-gray-600 mb-2">Order Status: {order.orderStatus}</p>
        <p className="text-gray-600 mb-2">Shipment Date: {order.shipmentDate}</p>
        <p className="text-gray-600 mb-2">Country: {order.country}</p>
        <p className="text-gray-600 mb-2">City: {order.city}</p>
        <p className="text-gray-600 mb-2">Region: {order.region}</p>
        <p className="text-gray-600 mb-2">Street: {order.street}</p>
        <p className="text-gray-600 mb-2">Zip Code: {order.zipCode}</p>
        <p className="text-gray-600 mb-2">Customer Phone: {order.customerPhone}</p>
      </div>
    </div>
  ))}
</div>

  )
}

export default Orders