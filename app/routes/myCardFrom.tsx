import { useState } from "react";
const MyCardFrom =  () => {

    const [myName, setMyname] = useState('')
    const [myStatus, setMyStatus] = useState(true)
    const [myMajor, setMymajor] = useState('')
    const [myTemplate, setmyTemplate] =useState('')
    const [myIndex, setIndex] = useState(0)
    const [myCards, setmyCards] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form)

        const formJson = Object.fromEntries(formData.entries())

        console.log(formJson)

        setmyCards([
            ...myCards,
            {
                id: myIndex,
                name: formJson.myName,

            }
        ])
        setIndex(myIndex +1)
    }

    return (
        <div className="m-3">
        <form method="post" onSubmit={handleSubmit}>
            <label className="text-lg font-bold">
                การเพิ่มข้อมูลนามบัตร
            </label>
            <hr />
            <p>
                ชื่อ-นามสกุล : 
                <input type="text" name="myName" className="border-solid border-2 border-indigo-600" onChange={(event) => setMyname(event.target.value)} />
            </p>

            <p>
                สถานะนามบัตร : 
                <input type="checkbox" name="myStatus" defaultChecked = {true} className="border border-blue-300" onChange={(event) => setMyStatus(event.target.checked)} />
            </p>
            <p>
                สาขาวิชา :
                <br />
                <input type="radio" name="myMajor" value="IT" onChange={(event) => setMymajor(event.target.value)} /> 
                <label className="m-2">
                    เทคโนโลยีสารสนเทศ
                </label>       
                <br />
                <input type="radio" name="myMajor" value="CS" onChange={(event) => setMymajor(event.target.value)}/>
                <label className="m-2">
                    วิทยาการคอมพิวเตอร์
                </label>
                <br />
                <input type="radio" name="myMajor" value="DBI" onChange={(event) => setMymajor(event.target.value)}/>
                <label className="m-2">
                    นวัตกรรมธุรกิจดิจิตอล
                </label>
                <br />
            </p>
            <p>
                รูปแบบนามบัตร : <br />
                <select name="myTemplate" className="border border-blue-300" onChange={(event) => setmyTemplate(event.target.value)}>
                    <option value="">
                        --เลือกรูปแบบ--
                    </option>
                    <option value='bg-red-300'>
                        Apple
                    </option>
                    <option value='bg-yellow-300'>
                        Banana
                    </option>
                    <option value='bg-orange-300'>
                        Orange
                    </option>
                </select>
            </p>
            <hr />
            <p>
                <button type="submit" className="bg-green-300 m-2 p-2">
                    SAVE
                </button>
                <button type="reset" className="bg-red-300 m-2 p-2">
                    CLEAR
                </button>
            </p>
            
        </form>
        <hr />
        <p>
            <label className="text-lg font-bold">
            ข้อมูลนามบัตรจาก Object Array
            </label>
            <p className="border border-blue-300 rounded-lg p-3 m-2">
               <ul>
                {
                    myCards.map((item, index) => (
                        <li key = {index}>
                            {item.name +''}
                            <button className="bg-red-300 p-2 m-2" onClick={()=> {
                                setmyCards(
                                myCards.filter((temp) => temp.id !== item.id)
                            )}}>
                                Delete
                            </button>
                        </li>
                    ))
                }
               </ul>
            </p>
            <p className="border border-green-200 border-radius-3">
            <p>
            <div className={
                        myTemplate !== '' ? 'shadow bx-border  border-3 '+myTemplate : ''
                    }>
                <p>
                    ชื่อ-นามสกุล : {myName !== '' ? myName : 'กรุณากรอกชื่อ-นามสกุล'}
                </p>
                <p>
                    สถานะนามบัตร : {myStatus !== false ? 'On' : 'Close'}
                </p>
                <p>
                    สาขาวิชา : {myMajor !== '' ? myMajor : 'กรุณาเลือกสาขาวิชา'}
                </p>
                
                   
                    

                    </div>
                </p>
            </p>
        </p>
        </div>
    )
}

   





export default MyCardFrom