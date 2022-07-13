const router = require('express').Router();
const { getAllUsers, getSingleUser, createUser, updateUser, deleteUser } = require('../../controllers/user-controller');

// all get and post requests
router
.route('/')
.get(getAllUsers)
.post(createUser);

// single get and post request
router
.route('/:id')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

module.exports = router;