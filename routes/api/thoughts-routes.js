const router = require('express').Router();
const { getAllThoughts, getSingleThought, createThought, updateThought, deleteThought } = require('../../controllers/thoughts-controller');

// all get and post requests
router
.route('/')
.get(getAllThoughts)
.post(createThought);

// single get and post request
router
.route('/:id')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

module.exports = router;