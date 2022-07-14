const router = require('express').Router();
const { getAllUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/user-controller');

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

// friend get, post, and delete routes
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;