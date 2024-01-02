import React from 'react'

const Dashboard = () => {
  const data = [
    { name:"user1", address: "add1", city: 'city1', state: "state1", country:"Nepal", pincode:123, phoneNum:9876543210, paymentId:1234, userId:4321, orderStatus:"Pending", },
    { name:"user2", address: "add2", city: 'city2', state: "state2", country:"Nepal", pincode:323, phoneNum:9876543234, paymentId:2222, userId:1111, orderStatus:"Pending", },
]

  return (
    <>
    <div className='min-h-[calc(100vh)]'>
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl font-bold mb-1 mt-8' >Orders</h1>
      <div className="h-1 w-60 bg-blue-700 rounded mb-6"></div>
    </div>
    <div className="flex justify-center items-center align-middle">
      <table className=' w-screen border-2'>
          <tr className="[&>*]:border-2 [&>*]:border-black">
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Pincode</th>
              <th>Phone</th>
              <th>Payment ID</th>
              <th>User ID</th>
              <th>Order Status</th>
          </tr>
          {data.map((val, key) => {
              return (
                  <tr className="[&>*]:border-2 [&>*]:border-black"
                    key={key}>
                      <td>{val.name}</td>
                      <td>{val.address}</td>
                      <td>{val.city}</td>
                      <td>{val.state}</td>
                      <td>{val.country}</td>
                      <td>{val.pincode}</td>
                      <td>{val.phoneNum}</td>
                      <td>{val.paymentId}</td>
                      <td>{val.userId}</td>
                      <td>{val.orderStatus}</td>
                  </tr>
              )
          })}
      </table>
    </div>
    </div>
    </>
  )
}

export default Dashboard