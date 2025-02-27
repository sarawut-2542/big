import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";

import fs from "fs"; // ใช้ fs แทนการ import JSON

const serviceAccount = JSON.parse(
  fs.readFileSync("./firebase/firebase.json", "utf8")
);

initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const dbFirebase = admin.firestore();

console.log("กำลังเริ่มต้น Firebase..");
dbFirebase
  .collection("test-book")
  .limit(1)
  .get()
  .then(() => {
    console.log("Connect Firebase Firestore success");
  })
  .catch((error) => {
    console.error("Connect Fail", error);
  });

const app = express();
const port = 3030; //ทำการ ประกาศ port
const name = "BIG";

app.use(cors());
app.use(express.json());
//mock data
const myOrder = [
  {
    orderId: "ORD001",
    orderDate: "11/02/2025",
    orderTotal: 2500,
    orderStatus: 10,
    orderBy: "Big",
  },
  {
    orderId: "ORD002",
    orderDate: "11/02/2025",
    orderTotal: 4500,
    orderStatus: 20,
    orderBy: "Boy",
  },
  {
    orderId: "ORD003",
    orderDate: "11/02/2025",
    orderTotal: 5000,
    orderStatus: 30,
    orderBy: "Ball",
  },
];

app.post("/addbook", async (req, res) => {
  const { bookTitle, bookDesc, bookAuthor } = req.body; // ดึงข้อมูลจาก JSON body

  if (!bookTitle || !bookDesc || !bookAuthor) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // สร้าง document ใหม่ใน Firestore
    const newBookRef = dbFirebase.collection("test-book").doc();
    const bookRef = dbFirebase.collection("test-book").doc(newBookRef.id);

    // ข้อมูลที่ต้องการเพิ่มใน Firestore
    const objBook = {
      bookId: newBookRef.id,
      bookTitle,
      bookDesc,
      bookAuthor,
    };

    // เพิ่มข้อมูลใน Firestore
    await bookRef.set(objBook);

    // ส่ง ID กลับให้ client
    res
      .status(201)
      .json({ message: "Book added successfully", bookId: newBookRef.id });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Failed to add book" });
  }
});

app.get("/getbooks", async (req, res) => {
  try {
    const result = await dbFirebase.collection("test-book").get(); // ดึงข้อมูลจากคอลเลกชัน test-book
    const books = [];

    // วนลูปผ่านแต่ละ document และเก็บข้อมูลใน array
    result.forEach((doc) => {
      books.push(doc.data()); // ใช้ doc.data() เพื่อดึงข้อมูลจาก document
    });

    // ส่งข้อมูลที่ได้กลับไปยัง client
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Failed to fetch books" }); // ถ้ามีข้อผิดพลาด
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    name: name,
    data: "success",
  });
}); // function นี้ เมื่อเข้าถึง locahost นี้ สำเร็จจะแสดงข้อมูล success ออกมา ในรูปแบบ json

app.get("/toDoLists/:userId/:orderId", (req, res) => {
  let myData = "<h1>My Profile</h1>";
  myData += "<strong>User ID : </strong>" + req.params.userId + "<br/>";
  myData += "<strong>Order ID : </strong>" + req.params.orderId;
  res.set("Content-type", "text/html");
  res.send(myData);
});

//localhost3030 for AllOrders
app.get("/orders", (req, res) => {
  res.send(myOrder);
});

//localhost3030 for FixIdOrder
app.get("/order/:ordid", (req, res) => {
  let orderId = req.params.ordid;
  const result = myOrder.filter((objOrd) => {
    return objOrd.orderId == orderId;
  });
  res.send(result[0]);
});

app.delete("/deletebook/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  await dbFirebase.collection("test-book").doc(bookId).delete();
  res.status(200).json({ message: "Book deleted successfully" });
});

app.put("/updatebook/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  const { bookTitle, bookDesc, bookAuthor } = req.body;
  await dbFirebase.collection("test-book").doc(bookId).update({
    bookTitle,
    bookDesc,
    bookAuthor,
  });
  res.status(200).json({ message: "Book updated successfully" });
});

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT [${port}]`); //ใช้เครื่องหมาย ` เพื่อที่จะ log ข้อมูลพร้อมตัวแปรได้
});
