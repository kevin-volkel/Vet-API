const User = require('../models/User');
const { BadRequestError, UnauthError } = require('../errors');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide both an email and password');
  }

  const userLogin = await User.findOne({ email });

  if (!userLogin) {
    throw new UnauthError('Invalid Credentials');
  }

  const isPassCorrect = await userLogin.comparePassword(password);

  if (!isPassCorrect) {
    throw new UnauthError('Incorrect Email or Password');
  }
  const token = userLogin.createJWT();
  res.json({ user: { name: userLogin.name }, token });
};

const register = async (req, res) => {
  const newUser = await User.create(req.body);
  const token = newUser.createJWT();
  res.json({ user: { name: newUser.name }, token });
};

const updatePermissions = (req, res) => {
  res.json({ msg: "I'm tired" });
};

module.exports = { login, register, updatePermissions };
