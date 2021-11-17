const postPet = (req, res) => {
  res.json({ msg: 'Never', status: 200 });
};
const updatePet = (req, res) => {
  res.json({ msg: 'Gonna', status: 200 });
};
const removePet = (req, res) => {
  res.json({ msg: 'Give', status: 200 });
};
const getPet = (req, res) => {
  res.json({ msg: 'You', status: 200 });
};
const getPets = (req, res) => {
  res.json({ msg: 'Up', status: 200 });
};
module.exports = { postPet, updatePet, removePet, getPet, getPets };
