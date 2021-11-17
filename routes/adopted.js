const express = require('express');
const router = express.Router();

const {
  getAdopted,
  getAllAdopted,
  postAdopted,
  removeAdopted,
  updateAdopted,
} = require('../controllers/adopted');

router.route('/').get(getAllAdopted).post(postAdopted);
router.route('/:id').get(getAdopted).delete(removeAdopted).put(updateAdopted);

module.exports = router