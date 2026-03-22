const jwt = require('jsonwebtoken');

// Authentication middleware to verify JWT token
const authMiddleware = (req, res, next) => {
    try{
        const token = req.headers['authorization']?.split(' ')[1];
        jwt.verify(token, process.env.JWT_key, (err, decoded) => {
            if (err) {
                return res.status(401).send(
                    {success: false,
                    message: 'Unauthorized' });
            }
            req.body.id = decoded.id;
            next();
        });


    } 
    catch(error){
        console.error('Error in authMiddleware:', error.message);
        res.status(500).send(
            {success: false,
            message: 'Server Error' });
    }
}



module.exports = authMiddleware;