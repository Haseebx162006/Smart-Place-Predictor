const admin = require('../configs/firebase')

exports.verify= async(req,res,next)=>{
    try {
        const req_headers= req.headers.authorization
        if(!req_headers || ! req_headers.startsWith("Bearer ")){
            return res.status(401).json({
                msg:"Error in token"
            })
        }
        const token = req_headers.split(" ")[1]
        try {
            const decoded= await admin.auth().verifyIdToken(token)
        } catch (error) {
            console.log("Error in decoding the token")
        }

        next();

    } catch (error) {
        return res.status(401).json({
            msg:"Error in first try catch block of auth"
        })
    }
}


