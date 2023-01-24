const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {

        const token = req.headers.authorization.split(' ')[1];
        const decodedtokent = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

        const userId = decodedtokent.userID;

        req.auth = {
            userId: userId
        }

        next();
    } catch (error) {
        res.status(401).json({ error })
    }
}