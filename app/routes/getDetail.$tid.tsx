import { useState } from "react";
import { useParams } from "@remix-run/react";
import MyMenu from "./templates/mymenu";
import MyFooter from "./templates/myfooter";


const GetDetail = () => {

    const myParams = useParams()
    const tid = myParams.tid

    return (
    <div className ="m-3">  
    <MyMenu />
    <h1 className="me-2 mb-2 p-3 flex flex-row justify-center">
        Details
    </h1>
    <div className="flex flex-row justify-center">
        <span className="me-2 mb-2 p-3">
            ID : {tid}
            <br />
            Todolist : 
        </span>     
    </div>   
    <MyFooter />
    </div>
    )
}

export default GetDetail

