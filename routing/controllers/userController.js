const users = require('../../models/userModel')
const jwt = require('jsonwebtoken')


//--------------------------user-----------------------

//register
exports.registerController = async (req, res) => {
        console.log("inside Register API");
        // console.log(req.body);
        const { username, email, password } = req.body
        // console.log(username, email, password);
        try {
                const existingUser = await users.findOne({ email })
                if (existingUser) {
                        res.status(409).json("User Already exist!! Please Login")
                } else {
                        const newUser = new users({
                                username,
                                email,
                                password
                        })
                        await newUser.save()
                        res.status(200).json(newUser)
                }
        } catch (err) {
                res.status(500).json(err)
        }

}

//login
exports.loginController = async (req, res) => {
        console.log("Inside Login API");
        // console.log(req.body);
        const { email, password } = req.body
        // console.log(email, password);
        try {
                const existingUser = await users.findOne({ email })
                if (existingUser) {

                        if (existingUser.password == password) {
                                //token
                                const token = jwt.sign({ userMail: existingUser.email,role:existingUser.role }, process.env.JWTSECRET)
                                res.status(200).json({ user: existingUser, token })

                        } else {
                                res.status(401).json("Invalid Credential")

                        }

                } else {
                        res.status(404).json("Account Doesn't exist!!!")
                }

        } catch (err) {
                res.status(500).json(err)
        }

}

//Google login
exports.googleLoginController = async (req, res) => {
        console.log("Inside Google Login API");
        // console.log(req.body);
        const { email, password, username, profile } = req.body
        // console.log(email, password);
        try {
                const existingUser = await users.findOne({ email })
                if (existingUser) {

                        //token
                        const token = jwt.sign({ userMail: existingUser.email,role:existingUser.role }, process.env.JWTSECRET)
                        res.status(200).json({ user: existingUser, token })

                } else {

                        const newUser = new users({
                                username, email, password, profile
                        })
                        await newUser.save()
                        //token
                        const token = jwt.sign({ userMail: newUser.email }, process.env.JWTSECRET)
                        res.status(200).json({ user: newUser, token })


                }

        } catch (err) {
                res.status(500).json(err)
        }

}


//profile-user-update
exports.userProfileEditController=async(req,res)=>{
        console.log("Inside userProfileEditController");
        //get data to be updated from req,body(text content),payload(userMail),file(profile)
        const {username,password,bio,role,profile}=req.body
        const email=req.payload
        const uploadedprofile=req.file?req.file.filename:profile
        try{
        const updatedUser=await users.findOneAndUpdate({email},{username,email,password,profile:uploadedprofile,bio,role},{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
        }catch(err)
        {
                console.log("error is",err);
                
                res.status(500).json(err)
        }

}

//---------------------admin---------------------

//get all users
exports.getAllUsersController=async(req,res)=>{
        console.log("Inside getAllUsersController");
        const email=req.payload
        try{
                const allUsers=await users.find({email:{$ne:email}})
                res.status(200).json(allUsers)
        }catch(err)
        {
                res.status(500).json(err)
                
        }
        
}

//get all books
exports.getAllBooksAdminController=async(req,res)=>{
        console.log("Inside getAllBooksAdminController");
        try{
                const allAdminBooks=await books.find()
                res.status(200).json(allAdminBooks)
        }catch(err){
                res.status(500).json(err)
        }
        
}