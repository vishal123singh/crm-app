const { User } = require("../MODELS/user.model");
const constants = require("../UTILS/constants");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signUp = async (req, res) => {
  let { id, name, email, password, usertype } = req.body;

  const fields = constants.signUpFields;

  let requiredFields = [];

  fields.forEach((key) => {
    if (!(key in req.body)) {
      requiredFields.push(key);
    }
  });

  if (requiredFields.length) {
    res.status(404).send({
      message: `You need to send ${requiredFields} as well for signing up successfully`,
    });
    return;
  }

  try {
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    let user = new User({
      userId: id,
      name: name,
      email: email,
      password: password,
    });

    const dup_id = await User.findOne({ userId: req.body.id });
    const dup_email = await User.findOne({ email: req.body.email });

    if (dup_id && dup_email) {
      res.status(400).send({
        msg: " These id and email have already been taken.Try different ones",
      });
    } else if (dup_id) {
      res
        .status(400)
        .send({ msg: "This id has already been taken.Try different one" });
    } else if (dup_email) {
      res
        .status(400)
        .send({ msg: "This email has already been taken.Try different one" });
    } else {
      if (!usertype || usertype.toUpperCase() == constants.userTypes.customer) {
        user.userStatus = constants.userStatus.approved;
      } else {
        user.userType = usertype.toUpperCase();
      }

      await user.save();

      res.status(201).send({ msg: `Welcome ${name}` });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Internal server error.Try again." }); //Never send error msg with response.It could make the app vulnerable to cyber-attacks
  }
};

exports.signIn = async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = await User.findOne({ userId: id });

    if (user) {
      let match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign(
          {
            id: user.userId,
            userType: user.userType,
            userStatus: user.userStatus,
          },
          process.env.JWT_secret,
          {
            expiresIn: "1h",
          }
        );

        res.cookie("jwt", token, { secure: false, httpOnly: true });
        res.status(200).send({ msg: `You are signed in successfully` });
      } else {
        res
          .status(404)
          .send({ msg: `Either your id or password is incorrect` });
      }
    } else {
      res.status(404).send({ msg: `Oops,user not found` });
    }
  } catch (err) {
    res.status(500).send({ msg: `Internal server error` });
  }
};
