import { useState,useEffect } from "react";
import MyFooter from "./templates/myfooter";
import MyMenu from "./templates/mymenu";

const MyOrder = () => {
    const [orders,setOrders] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    useEffect(() => {
        const fetchData = async() => {
            try {
                const resData = await fetch(`http://localhost:3030/orders`) 
                if(!resData.ok){
                    throw new Error('Error')
                }

                const resJson = await resData.json()
                setOrders(resJson)
            } catch (error) {
                alert(`Error [${error}]`)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    },[])

        if(isLoading){
            return (
                <p className="m-5">Loading......</p>
            )
        }
    return (
    <div className ="m-3">  
    <MyMenu />
    <strong className="me-2 mb-3 p-5 flex flex-row justify-center">
        My Lists Orders
    </strong>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
  {orders.map((item, index) => (
    <div key={index} className="bg-gradient-to-r from-teal-400 to-blue-500 p-6 rounded-lg shadow-xl border-2 border-gray-300">
      <strong className="text-2xl font-semibold text-white">
        OrderId: {item.orderId}
      </strong>
      <h1 className="text-lg text-white mt-2">
        Date: {item.orderDate}
      </h1>
      <h1 className="text-lg text-white mt-2">
        Status: <span >{item.orderStatus}</span>
      </h1>
      <div className="text-lg text-white mt-2 border border-teal-800 rounded text-center">
        <a href={`/order/${item.orderId}`}>
            Detail
        </a>
      </div>
    </div>
  ))}
</div>
    <MyFooter />
    </div>
    )
}

export default MyOrder

