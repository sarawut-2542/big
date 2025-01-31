import express from 'express'


const app = express()
const port = 3030 //ทำการ ประกาศ port 
const name = 'BIG'
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

app.listen(port, ()=>{
    console.log(`SERVER IS RUNNING ON PORT [${port}]`) //ใช้เครื่องหมาย ` เพื่อที่จะ log ข้อมูลพร้อมตัวแปรได้
})