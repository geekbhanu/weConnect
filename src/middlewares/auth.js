const jwt = require("jsonwebtoken");

// const userAuth = (req, res, next) => {
//     try {
//         const { token } = req.cookies;
//         if (!token) {
//             return res.status(401).send("No token provided");
//         }
//         const decoded = jwt.verify(token, "dev@weconnect2323");
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(401).send("Invalid token");
//     }
// };

const userAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send("Unauthorized: No token");
        }
        const decoded = jwt.verify(token, "dev@weconnect2323"); // <-- use jwt, not JWT
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).send("Unauthorized: Invalid token");
    }
};

module.exports = { userAuth };