const express = require('express');
const router = express.Router();

const {
  postPet,
  updatePet,
  removePet,
  getPet,
  getPets,
  clearPets
} = require('../controllers/pets');

router.route('/').post(postPet).get(getPets).delete(clearPets)
router.route('/:id').get(getPet).delete(removePet).put(updatePet);

module.exports = router;
