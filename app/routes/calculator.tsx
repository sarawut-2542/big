import MyMenu from "./templates/mymenu"
import MyFooter from "./templates/myfooter"
import { useState } from "react"

const MyCalculator = () => {
    const [constPlus1, setCountPlus1] = useState(0)

    const handleCountPlus1 = () => {
        //alert('Hello')
        setCountPlus1(constPlus1 +1)
    }

    const minusCountPlus1 = () => {
        //alert('Hello')
        setCountPlus1(constPlus1 -1)
    }

    return (
        <div className="m-0">
            <MyMenu />
            <div className="m-3">
                <h1>
                    การคำนวณ
                </h1>
                <p>
                    <h1 className="text-xx1">{constPlus1}</h1>
                <button type="button" onClick={handleCountPlus1} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">+ 1</button>
                <button type="button" onClick={minusCountPlus1} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">- 1</button>
                <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">3</button>
                </p>

            </div>
            <MyFooter /> 

        </div>
    )
}

export default MyCalculator