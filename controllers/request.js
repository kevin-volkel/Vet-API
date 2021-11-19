const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const { Request } = require("../models");
const { NotFoundError } = require("../errors");

const getRequest = async (req, res) => {
  const { id: requestId } = await req.params;
  const request = Request.findOne({
    _id: requestId
  });

  if (!job) {
    throw new NotFoundError(`Request of id ${requestId} not found`);
  }

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
const removeRequest = (req, res) => {
  res.json({ msg: "Me", status: 200 });
};
const updateRequest = (req, res) => {
  res.json({ msg: "The", status: 200 });
};
module.exports = {
  postRequest,
  getRequest,
  getRequests,
  removeRequest,
  updateRequest
};
