import express from 'express'


const app = express()
const port = 3030

app.get('/', (req,res) => {
    res.status(200).json('success')
})

app.get('/toDoLists/:userId/:orderId', (req,res) => {
    let myData = "<h1>My Profile</h1>"
    myData += "<strong>User ID : </strong>"+req.params.userId+"<br/>";
    myData += "<strong>Order ID : </strong>"+req.params.orderId;
    res.set('Content-type', 'text/html')
    res.send(myData)
})

app.listen(port, ()=>{
    console.log(`SERVER IS RUNNING ON PORT [${port}]`)
})