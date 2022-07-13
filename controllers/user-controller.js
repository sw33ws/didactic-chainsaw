const { User, Thoughts } = require('..models');

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
            plath: 'friends',
        })
        .populate({
            plath: 'thoughts',
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
}

module.exports = userController;