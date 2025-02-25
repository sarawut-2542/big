import { toDoItem } from "./toDoLists";
import MyFooter from "./templates/myfooter";
import MyMenu from "./templates/mymenu";

const CompletedCheck = ({ c }: { c: boolean }) => {
  return c ? <span>{"😚"}</span> : <span>{"🤢"}</span>;
};

const ToDolists = () => {
  const cpToDoItems = toDoItem.filter((cpToDo) => cpToDo.completed === false);
  const listItems = cpToDoItems.map((item, index) => (
    <div className="m-3" key={index}>
      <a
        href={`/getDetail/${item.id}`}
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        {/* <b>{item.created}</b> */}
        <b className="text-base">
          <CompletedCheck c={item.completed} />
        </b>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.title + " (รหัส: " + item.id + " )"}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {item.created}{" "}
        </p>
      </a>
    </div>
  ));

  return (
    <div className="m-3">
      <MyMenu />
      <strong className="text-x1">สิ่งที่ต้องทำ.</strong>
      {listItems}
      <MyFooter />
    </div>
  );
};

export default ToDolists;
