const { User, Thoughts } = require('../models');

const userController = {
    // getting all users
    getAllUsers(req, res){
        User.find({})
        .sort({_id: -1})
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // getting a single user
    getSingleUser(req, res){
        User.findOne({_id: req.params.id})
        .select('-__v')
        .populate({
            path: 'friends',
        })
        .populate({
            path: 'thoughts',
        })
        .then((users) => {
            if (!users){
                res.status(404).json({ message: 'no user found!'});
                return;
            }
            res.json(users)
        })
        .catch((err) => res.status(500).json(err))
    },
    // creating user
    createUser(req, res){
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },
    // updating user
    updateUser(req, res){
        User.findByIdAndUpdate(
            { _id: req.params.id}, { $set: req.body }, { runValidators: true, new: true})
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'no user found!'});
                    return;
                }
                res.json(user);
            })
            .catch(err => res.json(err));
    },
    // delating user
    deleteUser(req, res) {
        User.findByIdAndRemove(
            { _id: req.params.id}
        )
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'no user found!'});
                return;
            }
            res.json(user);
        })
        .catch(err => res.json(err));
    }
}

module.exports = userController;