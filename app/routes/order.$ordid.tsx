import { useState,useEffect } from "react";
import { useParams } from "@remix-run/react";
import MyFooter from "./templates/myfooter";
import MyMenu from "./templates/mymenu";


const MyOrder = () => {
    const [order,setOrder] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const { ordid } = useParams();
    useEffect(() => {
        const fetchData = async() => {
            try {
                const resData = await fetch(`http://localhost:3030/order/${ordid}`) 
                if(!resData.ok){
                    throw new Error('Error')
                }

                const resJson = await resData.json()
                setOrder(resJson)
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5 ">
  
    <div   className=" bg-gradient-to-r from-teal-400 to-blue-500 p-6 rounded-lg shadow-xl border-2 border-gray-300">
      <strong className="text-2xl font-semibold text-white ">
        OrderId : {order.orderId}
      </strong>
      <h1 className="text-lg text-white mt-2">
        Date : {order.orderDate}
      </h1>
      <h1 className="text-lg text-white mt-2">
        TotalPrice : <span >{order.orderTotal}</span>
      </h1>
      <h1 className="text-lg text-white mt-2">
        Status : <span >{order.orderStatus}</span>
      </h1>
      <h1 className="text-lg text-white mt-2">
        By : <span >{order.orderBy}</span>
      </h1>
      <div className="text-lg text-white mt-2 border border-teal-800 rounded text-center">
        <a href={`/orders`}>
            Back
        </a>
      </div>
    </div>
  
</div>
    <MyFooter />
    </div>
    )
}

export default MyOrder

