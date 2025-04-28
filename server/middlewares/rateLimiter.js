const rateLimit = require("express-rate-limit");

exports.rateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute time window. (MS = miliseconds)
    max: 4,
    // 'Too many request attempts, Try again later'
    handler: (req, res, next)=> {
        let err = new Error('Too many requests. Try again later');
        err.status = 429;
        return next(err);
    }
});

