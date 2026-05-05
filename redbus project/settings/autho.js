
require('dotenv').config();
const jwt = require('jsonwebtoken');



//  authoToken Creact

const authoToken = (userId) => {
    const secret = process.env.JWT_SECRET_KEY;

    if (!secret) {
        throw new Error('JWT_SECRET_KEY is not defined in .env');
    }

    return jwt.sign(
        { id: userId },
        secret,
        { expiresIn: '1d' }
    );
};


        // Autho Token Verifaid


const authorizationTokenVerify= (req, res, next)=>{

    try {
        const authorization_token = req.headers.authorization;

        if (!authorization_token || !authorization_token.startsWith("Bearer ")) {
            return res.status(401).json({
                status: "Failed",
                message: "Token missing or invalid"
            });
            
        }

        const token  = authorization_token.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user     = decode;

        next();


    } catch (error) {

        return res.status(401).json({
            status: "Failed",
            message: "Invalid or expired token",
            error: error.message 
        });
  
    }
};     


module.exports = {
    authoToken,
    authorizationTokenVerify

};