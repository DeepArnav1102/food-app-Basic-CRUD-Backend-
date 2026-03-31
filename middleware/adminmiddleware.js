const userModel = require("../models/userModel")

const adminMiddleware = async (req,res,next) => {
    try {
        const user = await userModel.findById(req.body.id);
        if(user.usertype !== 'admin'){
            return res.status(401).send({
                success: false,
                message: "Only Admin Access"
            })
        }else{
            next();
        }
    }
    catch (error){

        console.error("Error in Admin Middleware", error.message);

        res.status(500).send({
            success: false,
            message: "Error in Admin Middleware"
        })
    }
}

module.exports =  adminMiddleware ;