const express=require("express")
const userController=require('./controllers/userController')
const bookController=require('./controllers/bookController')
const jwtMiddleware = require("../middlewares/jwtMiddlewares")
const multer = require("multer")
const multerConfig = require("../middlewares/imageMulterMiddleware")
const router=express.Router()
const adminJwtMiddleware=require("../middlewares/adminJwtMiddleware")

//----------------------unauthorized user-----------------------

//register 
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//googlelogin
router.post('/google-login',userController.googleLoginController)


//--------------------------------Authorized user----------------------

//add book
router.post('/add-book',jwtMiddleware,multerConfig.array('uploadImges',3),bookController.addBookController)

//home-book
router.get('/home-books',bookController.getHomeBooksController)

//all-book
router.get('/all-books',jwtMiddleware,bookController.getAllBooksController)

//view-book
router.get('/book/:id/view',jwtMiddleware,bookController.viewBookController)

//view-book
router.get('/book/:id/view',jwtMiddleware,bookController.viewBookController)

//get useruploaded books
router.get('/user-books',jwtMiddleware,bookController.getAllUserBooksController)

//get userbought books
router.get('/user-bought-books',jwtMiddleware,bookController.getAllUserBoughtBooksController)

//delete useruploaded books
router.delete('/user-books/:id/remove',jwtMiddleware,bookController.deleteUserBookController)

//user profile update
router.put('/user-profile/edit',jwtMiddleware,multerConfig.single("profile"),userController.userProfileEditController)


//------------------------------ADMIN---------------------------------

//get user list
router.get('/all-user',adminJwtMiddleware,userController.getAllUsersController)

//get all books list
router.get('/admin-all-books',adminJwtMiddleware,bookController.getAllBooksAdminController)


//approve-books
router.put('/admin/book/approve',adminJwtMiddleware,bookController.updateBookStatusController)

//update admin profile
router.put('/admin-profile/edit',adminJwtMiddleware,multerConfig.single('profile'),userController.updateAdminProfileController)

module.exports=router