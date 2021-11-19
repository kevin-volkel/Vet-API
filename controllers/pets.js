const { UnauthError, NotFoundError, BadRequestError } = require('../errors');
const Pet = require('../models/Pet');
const { StatusCodes } = require('http-status-codes');

//! Create Pet
const postPet = async (req, res) => {
  const user = req.user;
  console.log(user);
  if (user.permission === 'user') {
    throw new UnauthError('Not authorized to do this');
  }
  const newPet = await Pet.create(req.body);
  res.status(StatusCodes.OK).json({ msg: 'success', pet: newPet });
};

//! Update Pet
const updatePet = async (req, res) => {
  res.json({ msg: 'Gonna', status: 200 });
};

//! Delete Pet
const removePet = async (req, res) => {
  const { permission } = req.user
  const { id } = req.params;

  if(permission === "user"){
    throw new UnauthError("You are not authorized to do this")
  }

  const pet = await Pet.findByIdAndDelete(id)

  if(!pet){
    throw new BadRequestError("Could not find a pet with the given ID")
  }

  res.status(StatusCodes.OK).json(pet)
};

//! Get a single pet
const getPet = async (req, res) => {
  const { id } = req.params;
  const pet = await Pet.findById(id)
  if(!pet){
    throw new BadRequestError("Could not find a pet with the given ID")
  }
  res.status(StatusCodes.OK).json(pet)
};

//! Get a list of pets with various filters
const getPets = async (req, res) => {
  const pets = await Pet.find({});
  if (!pets) {
    throw new NotFoundError('No results found');
  }
  res.status(StatusCodes.OK).json(pets);
};
module.exports = { postPet, updatePet, removePet, getPet, getPets };
