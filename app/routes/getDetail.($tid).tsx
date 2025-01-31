import { useParams } from "@remix-run/react";
import { toDoItem } from "./toDoLists";
import MyMenu from "./templates/mymenu";
import MyFooter from "./templates/myfooter";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";  // นำเข้า useEffect

const GetDetail = () => {
  const myParams = useParams();
  const tid = myParams.tid || "ไม่มี ID";
  const navigate = useNavigate();

  const tdItem = toDoItem.filter((item) => item.id == tid);

  function handleNotFound() {
    navigate('/pageNotFound');
  }

  useEffect(() => {
    if (tdItem.length === 0) {
      handleNotFound();
    } // ถ้า tdItem.length ส่งมาเป็น 0 จะทำการ redirect ไปที่ ไฟล์ pageNotFound
  }, [tdItem.length]); // เมื่อ tdItem.length เปลี่ยนแปลง จะเช็คเงื่อนไขนี้

  return (
    <div className="m-3">
      <MyMenu />
      <strong className="me-2 mb-2 p-3 flex flex-row justify-center">Details</strong>
      <div className="flex flex-row justify-center">
        <span className="me-2 mb-2 p-3">
          {
            tdItem.length === 0 ? null : ( // ถ้าไม่มีข้อมูล ให้แสดงข้อมูล
              <>
                <br />
                ID: {tid}
                <br />
                Todolist: {tdItem[0].title}
                <br />
                DATE : {tdItem[0].created}
              </>
            )
          }

          <div className="text-center">
            <br />
            <a href="/getToDoLists" type="button" className="bg-green-300 m-2 p-2 rounded">
              BACK
            </a>
          </div>
        </span>
      </div>
      <MyFooter />
    </div>
  );
};

export default GetDetail;
