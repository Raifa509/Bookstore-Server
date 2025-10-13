const mongoose=require('mongoose')

//schema creation
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        default:""
    },
    bio:{
       type:String,
        default:"Bookstore user"
    },
    role:{
        type:String,
        default:"user"
    }
})


//model creation
const users=mongoose.model("users",userSchema)
module.exports=users