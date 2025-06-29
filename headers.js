// headers.js
module.exports = (req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('Access-Control-Allow-Origin', '*');
    next();
};
