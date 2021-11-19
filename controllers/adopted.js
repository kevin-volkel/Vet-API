const mongoose = require('mongoose');
const { StatusCodes } = require('https-status-codes');

const { Adopted } = require('./models');

const getAdopted = (req, res) => {
  res.json({ msg: 'Gonna', status: 200 });
};
const getAllAdopted = async (req, res) => {
  const adopted = await Adopted.sort('adoptee');
  res.status(StatusCodes.OK).json({ adopted, count: adopted.length });
};
const postAdopted = async (req, res) => {
  const adoption = await req.body;
  res.status(StatusCodes.CREATED).json({ adoption });
};
const removeAdopted = (req, res) => {
  res.json({ msg: 'Gonna', status: 200 });
};
const updateAdopted = (req, res) => {
  res.json({ msg: 'Gonna', status: 200 });
};

module.exports = {
  getAdopted,
  getAllAdopted,
  postAdopted,
  removeAdopted,
  updateAdopted,
};
