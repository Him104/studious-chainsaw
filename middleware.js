const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {

    const token = req.header('x-auth-token');
if(!token){
    return res.status(401).send({message: "Please provide a valid token"})
}

try {

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded;
    next();
    
} catch (error) {
    return res.status(401).send({message: "Please provide a valid token"})
}


}