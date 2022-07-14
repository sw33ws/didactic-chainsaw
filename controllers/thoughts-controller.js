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
    // creating thought
    createThought(req, res) {
        Thoughts.create(req.body)
        .then((thoughtsdata) => {
            return User.findOneAndUpdate(
                { _id: req.body.id}, { $addToSet: { thoughts: thoughtsdata._id}}, { new: true}
            );
        })
        .then((thoughtsdata) => {
            if (!thoughtsdata) {
                res.status(404).json({ message: 'no thoughts found!'});
                return;
            }
            res.json(thoughtsdata);
        })
        .catch(err => res.json(err));
    },
    // update thought
    updateThought(req, res){
        Thoughts.findByIdAndUpdate(
            { _id: req.params.thoughtsdata}, { $set: req.body }, { runValidators: true, new: true})
            .then(thoughtsdata => {
                if (!thoughtsdata) {
                    res.status(404).json({ message: 'no thoughts found!'});
                    return;
                }
                res.json(thoughtsdata);
            })
            .catch(err => res.json(err));
    },
    // delating thought
    deleteThought(req, res) {
        Thoughts.findByIdAndRemove(
            { _id: req.params.thoughtsdata}
        )
        .then(thoughtsdata => {
            if (!thoughtsdata) {
                res.status(404).json({ message: 'no thoughts found!'});
                return;
            }
            res.json(thoughtsdata);
        })
        .catch(err => res.json(err));
    },
    // creating reaction
}

module.exports = thoughtsController;