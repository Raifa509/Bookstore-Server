//register

exports.registerController = (req,res)=>{
        console.log("inside Register API");
        // console.log(req.body);
        const {username,email,password}=req.body
        console.log(username,email,password);
        res.status(200).send("Register request received!!!")
        
}

//login


//profile