const express=require("express")
const userController=require('./controllers/userController')
const bookController=require('./controllers/bookController')
const jwtMiddleware = require("../middlewares/jwtMiddlewares")

const router=express.Router()

//register 
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//googlelogin
router.post('/google-login',userController.googleLoginController)

//add book
router.post('/add-book',jwtMiddleware,bookController.addBookController)

module.exports=router