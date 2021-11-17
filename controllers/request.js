const postRequest = (req, res) => {
  res.json({ msg: 'Somebody', status: 200 });
};
const getRequest = (req, res) => {
  res.json({ msg: 'Once', status: 200 });
};
const getRequests = (req, res) => {
  res.json({ msg: 'Told', status: 200 });
};
const removeRequest = (req, res) => {
  res.json({ msg: 'Me', status: 200 });
};
const updateRequest = (req, res) => {
  res.json({ msg: 'The', status: 200 });
};
module.exports = {
  postRequest,
  getRequest,
  getRequests,
  removeRequest,
  updateRequest,
};
