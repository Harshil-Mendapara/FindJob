const fetchUser = (req, res, next) => {
    if (req.session && req.session.user) {
        req.user = req.session.user;
        return next();
    } else {
        return res.redirect('/login');
    }
};

const Authenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return res.redirect('/');
    }
    next();
};

module.exports = { fetchUser, Authenticated };
