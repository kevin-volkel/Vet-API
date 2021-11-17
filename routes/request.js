const express = require('express');
const router = express.Router();

const {
  postRequest,
  getRequest,
  getRequests,
  removeRequest,
  updateRequest,
} = require('../controllers/request');

router.route('/').post(postRequest).get(getRequests);
router.route('/:id').get(getRequest).delete(removeRequest).put(updateRequest);

module.exports = router;
