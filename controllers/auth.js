const User = require('../models/User');
const { BadRequestError, UnauthError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');

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
  res.json({ user: { name: userLogin.username, id: userLogin._id }, token });
};

const register = async (req, res) => {
  const newUser = await User.create(req.body);
  const token = newUser.createJWT();
  res.json({ user: { name: newUser.username }, token });
};

const updateUser = async (req, res) => {
  const curUser = req.user;
  const curUserID = req.user.userID;
  const { id: paramID } = req.params;

  const userObject = await User.findOne({ paramID });
  if (curUser.permission !== 'teacher' || curUser.permission !== 'moderator') {
    const reqPerm = req.body.permission;
    if (reqPerm) {
      if (userObject.permission !== reqPerm) {
        throw new UnauthError(
          'You do not have permissions to change permissions.'
        );
      }
    }
    if (curUserID !== paramID) {
      console.log(curUserID, paramID);
      throw new UnauthError(
        `You do not have permissions to change that user's information.`
      );
    }
  }

  const updatedPassword = req.body.password;

  if (updatedPassword) {
    req.body.password = await bcrypt.hash(
      req.body.password,
      bcrypt.genSaltSync()
    );
  }
  const updatedUser = await User.findByIdAndUpdate(paramID, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK);
  updatedUser.password = 'password123';
  res.json(updatedUser);
};

const getUsers = async (req, res) => {

  if(req.user.permission === 'user'){
    throw new UnauthError('You are not authorized to do this')
  }

  const users = await User.find({})
  res.status(200).json(users)
}

const deleteUser = async (req, res) => {
  const { permission } = req.user;
  const { id } = req.params;

  if (permission === 'user') {
    throw new UnauthError('You are not authorized to do this');
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new BadRequestError('Could not find a user with the given ID');
  }

  res.status(StatusCodes.OK).json(user);
};

module.exports = { login, register, updateUser, getUsers, deleteUser };
