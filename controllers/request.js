const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const { Request } = require("../models");
const { NotFoundError, UnauthError } = require("../errors");

const findRequestById = async (req) => {
  const { id: requestId } = await req.params;
  const request = Request.findById({
    _id: requestId
  });
  if (!request) {
    throw new NotFoundError(`No request of id ${requestId}`);
  }

  return request;
};
const checkPermissionIsUser = async (req) => {
  if (req.user.permission === "user") {
    throw new UnauthError("Permission denied");
  }
};

const getRequest = async (req, res) => {
  const request = await findRequestById(req);

  res.status(200).json({ request });
};

const getAllRequests = async (req, res) => {
  const adopted = await Request.find({});
  res.status(StatusCodes.OK).json({ adopted, count: adopted.length });
};

const postRequest = async (req, res) => {
  await checkPermissionIsUser(req);
  const request = await Request.create(req.body);
  res.status(StatusCodes.CREATED).json({ request });
};
const removeRequest = async (req, res) => {
  await checkPermissionIsUser(req);
  // const request = findRequestById(req);
  const request = await Request.findByIdAndDelete(req.params.id);

  res.status(200).json({ request });
};
const updateRequest = async (req, res) => {
  await checkPermissionIsUser(req);
  const {
    params: { id: requestId }
  } = req;
  const request = await Request.findByIdAndUpdate(requestId, req.body, {
    new: true,
    runValidators: true
  });
  if (!request) {
    throw new NotFoundError(`No request of id ${requestId}`);
  }

  res.status(200).json({ request });
};

module.exports = {
  postRequest,
  getRequest,
  getAllRequests,
  removeRequest,
  updateRequest
};
