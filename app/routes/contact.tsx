import { useState } from "react";
import MyFooter from "./templates/myfooter";
import MyMenu from "./templates/mymenu";

const MyContact = () => {
    return (
    <div className ="m-3">  
    <MyMenu />
    <h1 className="me-2 mb-2 p-3 flex flex-row justify-center">
        My Contact
    </h1>
    <div className="flex flex-row justify-center">
        <span className="me-2 mb-2 p-3">Sarawut Rungwongwat <br />
                                        สราวุฒน์ รุ่งวงศ์วัฒน์
        </span>     
    </div>   
    <MyFooter />
    </div>
    )
}

export default MyContact

