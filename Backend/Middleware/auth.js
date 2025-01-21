const jwt = require('jsonwebtoken');

// Verify JWT token middleware 
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send('Access Denied');

    
    const token = authHeader.split(' ')[1];
    
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).send('Invalid Token');
    }
};

// Verify client role middleware
const verifyClientRole = (req, res, next) => {
    if (req.user.role !== 'client') {
        return res.status(403).send('Access Denied: Client role required');
    }
    next();
};

const verifyFreelancerRole = (req, res, next) => {
    if (req.user.role !== 'freelancer') {
        return res.status(403).send('Access Denied: Freelancer role required');
    }
    next();
};

module.exports = { verifyToken, verifyClientRole, verifyFreelancerRole };