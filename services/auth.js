const jwt = require("jsonwebtoken");
const secret = "iRoNm@n!@#";

function generateToken(user) {
  const payload = {
    _id: user.id,
    fullName: user.fullName,
    email: user.email,
    image: user.profileImageUrl,
    role: user.role,
  };
  const token = jwt.sign(payload, secret);
  return token;
}

function verifyToken(token) {
    const payload = jwt.verify(token, secret);
    return payload;
}

module.exports = {
    generateToken,
    verifyToken
}