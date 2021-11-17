const login = (req, res) => {
  res.json({ msg: 'You suck', status: 200 });
};

const register = (req, res) => {
  res.json({ msg: 'Hello', status: 200 });
};

const updatePermissions = (req, res) => {
  res.json({ msg: "I'm tired" });
};

module.exports = { login, register, updatePermissions };
