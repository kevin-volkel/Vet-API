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
  const pets = await Pet.findById(id)
  if(!pet){
    throw new BadRequestError("Could not find a pet with the given ID")
  }
  res.status(StatusCodes.OK).json(pets)
};

//! Get a list of pets with various filters
const getPets = async (req, res) => {
  const { name, age, gender, species } = req.query;
  
  const queryObject = {};
  if(name) queryObject.name = { $regex: name, $options: 'i'}
  if(species) queryObject.species = { $regex: species, $options: 'i'}
  if(gender) queryObject.gender = gender;
  if (age) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<=': '$lte',
      '<': '$lt',
    };
    const re = /\b(<|>|<=|=|>=)\b/g;
    
    let newFilters = age.replace(re, (match) => `-${operatorMap[match]}-`);
    newFilters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      queryObject['hourAge'] = { [operator]: Number(value) };
    });
  }
  
  let pets = await Pet.find(queryObject);
  
  if (!pets) {
    throw new NotFoundError('No results found');
  }
  res.status(StatusCodes.OK).json(pets);
};

const clearPets = async (req, res) => {
  const pets = await Pet.deleteMany({})
  res.status(200).json(pets)
}
module.exports = { postPet, updatePet, removePet, getPet, getPets, clearPets };
