import { toDoItem } from "./toDoLists";
import MyFooter from "./templates/myfooter";
import MyMenu from "./templates/mymenu";
import { useState } from "react";

const CompletedCheck = ({ c }: { c: boolean }) => {
    return c ? <span>{'😚'}</span> : <span>{'🤢'}</span>;
};



const ToDolists = () => {

    const [cpStatus,setStatus] = useState(null)

    const cpToDoItems = toDoItem.filter(cpToDo => {
        if(cpStatus === null) return true;
        return cpToDo.completed === cpStatus;
    }
        //cpToDo.completed === false
    )
    

    const handleComplete = ( st : any) => {
        setStatus(st) 
    }
    const listItems = cpToDoItems.map((item, index) =>         
                    <div className="m-3" key={index}>
                  <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                {/* <b>{item.created}</b> */}
                <b className="text-base">
                    <CompletedCheck c={item.completed}/>
                </b>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title+"(รหัส: "+item.id+" )"}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                {item.created} </p>
            </a>
        </div>
        
    );  

      
    return (
        <div className ="m-3">  
        <MyMenu />
        <strong className="text-x1">
            สิ่งที่ต้องทำ...
        </strong>
        <div className="flex flex-row justify-center">
            <span className="me-2 mb-2 p-3">สถานะดำเนินการ:</span>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>handleComplete(null)}>All</button>
            <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"onClick={()=>handleComplete(true)}>Completed</button>
            <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900" onClick={()=>handleComplete(false)}>Incomplete</button>
            </div>
        {listItems}
        <MyFooter />
        </div>
    );
    
}

export default ToDolists