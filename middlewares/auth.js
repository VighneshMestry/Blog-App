const { verifyToken } = require("../services/auth");

function checkAuthentication(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) return next();
    try {
      const payload = verifyToken(token);
      req.user = payload;
    } catch (e) {}
    return next();
  };
}

module.exports = {
  checkAuthentication,
};
