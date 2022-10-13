module.exports = (req, res, next) => {
    res.locals.userInSession = req.session.user;
    next();
};