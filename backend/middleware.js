const { JWT_SECRET } = require('./config')
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log(authHeader)
    if(authHeader === null || !authHeader.startsWith("Bearer")){
        return res.status(401).json({
            msg: 'no authHeader, authorization denied'
        })
    }
    const token = authHeader.split(' ')[1]
    try{
        const verified = jwt.verify(token, JWT_SECRET)
        console.log(verified)
        req.user_id = verified.user_id
        next()
    }catch(err){
        res.status(400).json({
            msg: 'authHeader is not valid'
        })
    }
}
module.exports = { authMiddleware }