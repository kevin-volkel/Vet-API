const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const { Adopted } = require("../models");

const findAdoptedById = async (req) => {
  const { id: adoptedId } = await req.params;
  const adopted = Adopted.findById({
    _id: adoptedId
  });
  if (!adopted) {
    throw new NotFoundError(`No adopted of id ${adoptedId}`);
  }

  return adopted;
};
const checkPermissionIsUser = async (req) => {
  if (req.user.permission === "user") {
    throw new UnauthError("Permission denied");
  }
};

const getAdopted = async (req, res) => {
  const adopted = await findAdoptedById(req);
  res.status(200).json({ adopted });
};
const getAllAdopted = async (req, res) => {
  const adopted = await Adopted.find({});
  res.status(200).json({ adopted, count: adopted.length });
};
const postAdopted = async (req, res) => {
  await checkPermissionIsUser(req);
  const adopted = await Adopted.create(req.body);
  res.status(StatusCodes.CREATED).json({ adopted });
};
const removeAdopted = async (req, res) => {
  await checkPermissionIsUser(req);
  const adopted = await Adopted.findByIdAndDelete(req.params.id);
  res.status(200).json({ adopted });
};
const updateAdopted = async (req, res) => {
  await checkPermissionIsUser(req);
  const { id: adoptedId } = req.params;
  const adopted = await Adopted.findByIdAndUpdate(adoptedId, req.body, {
    new: true,
    runValidators: true
  });
  if (!adopted) {
    throw new NotFoundError(`No adopted of id ${adoptedId}`);
  }

  res.status(200).json({ adopted });
};

module.exports = {
  getAdopted,
  getAllAdopted,
  postAdopted,
  removeAdopted,
  updateAdopted
};
