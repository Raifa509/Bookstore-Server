//import all the installed libraries
//loads .env file content into process.env
require("dotenv").config()
const express=require("express")
const cors=require("cors")
const router=require('./routing/router')

//create server
const bookstoreServer=express()

//enable cors protocol in server app
bookstoreServer.use(cors())

//parse json - only happens when json data comes before goes to rounting
bookstoreServer.use(express.json())
bookstoreServer.use(router)

//create port for application
const PORT=3000


//to run server PORT
bookstoreServer.listen(PORT,()=>{
    console.log(`BookStore server started at PORT : ${PORT}, and waiting for client request!!!`);
    
})

//resolving http request

bookstoreServer.get('/',(req,res)=>{
        res.status(200).send(`<h1>Bookstore server started...</h1>`)
})

// bookstoreServer.post('/',(req,res)=>{
//         res.status(200).send(`POST request`)
// })