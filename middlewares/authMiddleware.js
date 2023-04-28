const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        //get token from req.header to access the token
        const token = req.header("authorization").split(" ")[1];
        const decryptedToken = jwt.verify(token, process.env.jwt_secret)
        console.log(decryptedToken._id)
        req.body.userId = decryptedToken.userId;
        next()
    } catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }
}