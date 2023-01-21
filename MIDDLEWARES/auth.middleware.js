require("dotenv").config();

const jwt = require("jsonwebtoken");
const constants = require("../UTILS/constants");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res
      .status(401)
      .send({ message: "You first need to authenticate yourself." });
    return;
  }

  jwt.verify(token, process.env.JWT_secret, (err, valid_user) => {
    if (valid_user) {
      req.userType = valid_user.userType;
      req.userStatus = valid_user.userStatus;
      next();
    }
    else if (err) {
      res.end(err.message);
    }
  });
};

exports.isAdmin = (req, res, next) => {
  if (
    req.userType === constants.userTypes.admin &&
    req.userStatus === constants.userStatus.approved
  ) {
    next();
  } else {
    res
      .status(403)
      .send({ message: "Sorry, you don't have access rights to the content" });
  }
};
