const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const { Request } = require("../models");
const { BadRequestError, NotFoundError } = require("../errors");

const findRequestById = (req) => {
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
  const request = findRequestById(req);

  res.status(200).json({ request });
};
const getAllRequests = async (req, res) => {
  const requests = await Request.sort("adoptee");
  res.status(StatusCodes.OK).json({ adopted, count: adopted.length });
};
const postRequest = async (req, res) => {
  const request = await req.body;
  res.status(StatusCodes.CREATED).json({ request });
};
const removeRequest = async (req, res) => {
  const request = findRequestById(req);

  res.status(200).json({ request });
};
const updateRequest = async (req, res) => {
  const {
    body: { petID: petId, status },
    user: { userID: userId },
    params: { id: requestId }
  } = req;
  if (!petId || !status) {
    throw new BadRequestError("Pet ID and status required");
  }
  if (!requestId) {
    throw new NotFoundError(`No request of id ${requestId}`);
  }

  const request = await Request.findByIdAndUpdate({ id: requestId }, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ request });
};

module.exports = {
  postRequest,
  getRequest,
  getAllRequests,
  removeRequest,
  updateRequest
};
