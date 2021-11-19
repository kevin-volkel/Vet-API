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
  res.json({ user: { name: userLogin.username }, token });
};

const register = async (req, res) => {
  const newUser = await User.create(req.body);
  const token = newUser.createJWT();
  res.json({ user: { name: newUser.username }, token });
};

const updatePermissions = async (req, res) => {
  const curUser = req.user;
  const curUserID = req.user.id;
  const { id: paramID } = req.params;

  const userObject = await User.findOne({ paramID });
  if (
    curUser.permissions !== 'teacher' ||
    curUser.permissions !== 'moderator'
  ) {
    const reqPerm = req.body.permissions;
    if (reqPerm) {
      if (userObject.permissions !== reqPerm) {
        throw new UnauthError(
          'You do not have permissions to change permissions.'
        );
      }
    }
    if (curUserID !== paramID) {
      throw new UnauthError(
        `You do not have permissions to change that user's information.`
      );
    }
  }
};

module.exports = { login, register, updatePermissions };
