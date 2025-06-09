const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if(!token) return res.status(401).json({message: "No token provided: Access denied!"})
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded
        next();
    }catch(err) {
        console.error(err);
        res.status(401).json({message: "Invalid token: Access denied!"})
    }
    
}