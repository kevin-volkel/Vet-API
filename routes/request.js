const express = require('express');
const router = express.Router();

const {
  postRequest,
  getRequest,
  getAllRequests,
  removeRequest,
  updateRequest,
} = require('../controllers/request');

router.route('/').post(postRequest).get(getAllRequests);
router.route('/:id').get(getRequest).delete(removeRequest).put(updateRequest);

module.exports = router;
