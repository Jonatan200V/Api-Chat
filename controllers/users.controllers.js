const userSchema = require('../model/user.model');
const bcryptjs = require('bcryptjs');
const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const userCheck = await userSchema.find({
      $or: [{ username }, { email }],
    });
    console.log(userCheck);
    if (!(userCheck.length === 0)) {
      throw new Error({ msg: 'User exists', status: false });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new userSchema({
      username,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(201).json({ status: true, newUser: user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const userCheck = await userSchema.find({
      username,
    });
    console.log(userCheck);
    if (userCheck.length === 0) {
      throw new Error({ msg: 'Incorrect user or password', status: false });
    }
    console.log('xd');
    const correctPassword = await bcryptjs.compare(
      password,
      userCheck[0].password
    );
    if (correctPassword) {
      return res.status(201).json({ status: true, newUser: userCheck });
    }
    res.status(400).json({ msg: 'Incorrect user or password' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const setAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const { avatarImage } = req.body;
    const userData = await userSchema.findByIdAndUpdate(id, {
      isAvatarImageSet: true,
      avatarImage,
    });
    res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await userSchema.find(
      { _id: { $ne: req.params.id } },
      {
        email: true,
        username: true,
        avatarImage: true,
        _id: true,
      }
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
//Jutar todos los errores en un middleware con next
module.exports = {
  login,
  register,
  setAvatar,
  getAllUsers,
};
