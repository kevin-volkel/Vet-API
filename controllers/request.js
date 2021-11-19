const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const { Request } = require("../models");
const { BadRequestError, NotFoundError } = require("../errors");
const { findByIdAndDelete } = require("../models/User");

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

const getRequest = async (req, res) => {
  const request = await findRequestById(req);

  res.status(200).json({ request });
};

const getAllRequests = async (req, res) => {
  const adopted = await Request.find({});
  res.status(StatusCodes.OK).json({ adopted, count: adopted.length });
};

const postRequest = async (req, res) => {
  const request = await Request.create(req.body);
  res.status(StatusCodes.CREATED).json({ request });
};
const removeRequest = async (req, res) => {
  // const request = findRequestById(req);
  const request = await Request.findByIdAndDelete(req.params.id)

  res.status(200).json({ request });
};
const updateRequest = async (req, res) => {
  const {
    params: { id: requestId }
  } = req;
  const request = await Request.findByIdAndUpdate(requestId, req.body, {
    new: true,
    runValidators: true
  });
  if (!request) {
    throw new NotFoundError(`No request found with ID of :${requestId}`);
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
