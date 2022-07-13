const { Thoughts, User } = require('../models');

const thoughtsController = {
    // getting all thoughts
    getAllThoughts(req, res){
        Thoughts.find({})
        .sort({_id: -1})
        .then((thoughtsdata) => res.json(thoughtsdata))
        .catch((err) => res.status(500).json(err));
    },
    // getting a single thought
    getSingleThought(req, res){
        Thoughts.findOne({_id: req.params.id})
        .select('-__v')
        .populate({
            path: 'reactions',
        })
        .then((thoughtsdata) => {
            if (!thoughtsdata){
                res.status(404).json({ message: 'no thoughts found!'});
                return;
            }
            res.json(thoughtsdata)
        })
        .catch((err) => res.status(500).json(err))
    },
    // creating user
}

module.exports = thoughtsController;