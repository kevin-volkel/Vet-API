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
  const { id } = req.params;
  if (req.user.permission === 'user') {
    throw new UnauthError('You are not authorizaed to do this');
  }

  const pet = await Pet.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  
  if(!pet){
    throw new NotFoundError(`No pets were found with ID of ${id}`)
  }
  res.status(StatusCodes.OK).json(pet);
};

//! Delete Pet
const removePet = async (req, res) => {
  const { permission } = req.user;
  const { id } = req.params;

  if (permission === 'user') {
    throw new UnauthError('You are not authorized to do this');
  }

  const pet = await Pet.findByIdAndDelete(id);

  if (!pet) {
    throw new BadRequestError('Could not find a pet with the given ID');
  }

  res.status(StatusCodes.OK).json(pet);
};

//! Get a single pet
const getPet = async (req, res) => {
  const { id } = req.params;
  const pets = await Pet.findById(id);
  if (!pets) {
    throw new BadRequestError('Could not find a pet with the given ID');
  }
  res.status(StatusCodes.OK).json(pets);
};

//! Get a list of pets with various filters
const getPets = async (req, res) => {
  const { name, age, gender, species, sort, fields } = req.query;

  let queryObject = {};
  if (name) queryObject.name = { $regex: name, $options: 'i' };
  if (species) queryObject.species = { $regex: species, $options: 'i' };
  if (gender) queryObject.gender = gender;
  if (age) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<=': '$lte',
      '<': '$lt',
    };
    const re = /(<=|>=|<|>|=)/g;
    let newFilter = age.replace(re, (match) => `${operatorMap[match]}-`);
    const [operator, value] = newFilter.split('-');
    queryObject['hourAge'] = { [operator]: Number(value) };
  }

  let results = Pet.find(queryObject);

  if (sort) {
    const sortList = sort.split(',').join(' ');
    results = results.sort(sortList);
  } else {
    results = results.sort('createdAt');
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    results = results.select(fieldsList);
  }

  if (!results) {
    throw new NotFoundError('No results found');
  }

  const pets = await results;

  res.status(StatusCodes.OK).json(pets);
};

const clearPets = async (req, res) => {
  const pets = await Pet.deleteMany({});
  res.status(200).json(pets);
};
module.exports = { postPet, updatePet, removePet, getPet, getPets, clearPets };
