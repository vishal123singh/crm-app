const { User } = require("../MODELS/user.model");
const { objectConvertor } = require("../UTILS/objectConvertor");

exports.findAll = async (req, res) => {
  const { name, usertype, userStatus } = req.query;
  try {
    let users = await User.find({ name: name });
    if (name) {
      users = users.filter((user) => {
        return user.name == name;
      });
    }
    if (usertype) {
      users = users.filter((user) => {
        return user.userType == usertype;
      });
    }
    if (userStatus) {
      users = users = users.filter((user) => {
        return user.userStatus == userStatus;
      });
    }

    res.status(200).send(objectConvertor(users)); // or we could use the projection feature
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

exports.findById = async (req, res) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findOne(
      { userId: id }
    );
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
  if (user) {
    res.status(200).send(objectConvertor([user]));
  } else {
    res.status(404).send({ msg: `No user was found for id ${id}` });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.userId;

  const new_Status = req.body.userStatus;
  try {
    const user = await User.findOneAndUpdate(
      { userId: id },
      { userStatus: new_Status.toUpperCase() }
    ).exec();
    if (user) {
      res.status(200).send({ msessage: "UserStatus got updated successfully" });
    } else {
      res.status(404).send({ msessage: "User does not exist" });
    }
  } catch (error) {
    res.status(500).send({ msessage: "Internal Server Error" });
  }
};
