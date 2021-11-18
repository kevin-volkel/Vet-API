const { UnauthError, NotFoundError } = require("../errors");
const Pet = require("../models/Pet");
const { StatusCodes } = require('http-status-codes')


const postPet = async (req, res) => {
  const user = req.user;
  if(user.permission === 'user'){
    throw new UnauthError("Not authorized to do this")
  }
  const newPet = await Pet.create(req.body)
  res.status(StatusCodes.OK).json({ msg: 'success', pet: newPet});
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
const getPets = async (req, res) => {
  const pets = await Pet.find({})
  if(!pets){
    throw new NotFoundError('No results found')
  }
  res.status(StatusCodes.OK).json(pets)
};
module.exports = { postPet, updatePet, removePet, getPet, getPets };
