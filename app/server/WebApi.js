import express from 'express'
import cors from 'cors'


const app = express()
const port = 3030 //ทำการ ประกาศ port 
const name = 'BIG'

app.use(cors());

//mock data
const myOrder = [
    {
        "orderId" : "ORD001",
        "orderDate" : "11/02/2025",
        "orderTotal" : 2500,
        "orderStatus" : 10,
        "orderBy" : "Big"
    },
    {
        "orderId" : "ORD002",
        "orderDate" : "11/02/2025",
        "orderTotal" : 4500,
        "orderStatus" : 20,
        "orderBy" : "Boy"
    },
    {
        "orderId" : "ORD003",
        "orderDate" : "11/02/2025",
        "orderTotal" : 5000,
        "orderStatus" : 30,
        "orderBy" : "Ball"
    }
]

app.get('/', (req,res) => {
    res.status(200).json({
        name : name,
        data : 'success'
    })
}) // function นี้ เมื่อเข้าถึง locahost นี้ สำเร็จจะแสดงข้อมูล success ออกมา ในรูปแบบ json

app.get('/toDoLists/:userId/:orderId', (req,res) => {
    let myData = "<h1>My Profile</h1>"
    myData += "<strong>User ID : </strong>"+req.params.userId+"<br/>";
    myData += "<strong>Order ID : </strong>"+req.params.orderId;
    res.set('Content-type', 'text/html')
    res.send(myData)
})


//localhost3030 for AllOrders
app.get('/orders', (req,res) => {
    res.send(myOrder)
}
)

//localhost3030 for FixIdOrder
app.get('/order/:ordid', (req,res) => {
    let orderId = req.params.ordid
    const result = myOrder.filter(
    (objOrd , index) => {
        return objOrd.orderId == orderId
    }
    )
    res.send(result[0])
}
)

app.listen(port, ()=>{
    console.log(`SERVER IS RUNNING ON PORT [${port}]`) //ใช้เครื่องหมาย ` เพื่อที่จะ log ข้อมูลพร้อมตัวแปรได้
})