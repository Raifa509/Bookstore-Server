const books=require('../../models/bookModel')

//add book
exports.addBookController=(req,res)=>{
    console.log('Inside addBookController');
    res.status(200).json("Request Received!!")
    
}