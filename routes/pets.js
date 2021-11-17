const express = require('express');
const router = express.Router();

const {
  postPet,
  updatePet,
  removePet,
  getPet,
  getPets,
} = require('../controllers/pets');

router.route('/').post(postPet).get(getPets);
router.route('/:id').get(getPet).delete(removePet).put(updatePet);

module.exports = router;
