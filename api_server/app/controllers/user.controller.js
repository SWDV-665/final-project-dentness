const User = require('../models/user.model.js');

const projection = 'first_name last_name email';

exports.create = (req, res) => {
    // Create a User
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    });

    // Save user in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

exports.findAll = (req, res) => {
    User.find({}, projection)
        .then(users => {
            res.send(users);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

exports.findUserById = (req, res) => {
    User.findById(req.params.userId, projection)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

exports.findUserByEmail = (req, res) => {
    User.findOne({email: req.params.email}, projection)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with the email " + req.params.email
                });
            }
            res.send(user);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with email " + req.params.email
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with email " + req.params.email
        });
    });
};

exports.update = (req, res) => {
    User.updateOne({_id: req.body._id}, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.body._id
                });
            }
            res.send(user);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.body._id
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.body._id
        });
    });
};

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({message: "User deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};

exports.login = (req, res) => {
    User.findOne({email: req.params.email, password: req.params.password}, projection)
        .then(user => {
            if (!user) {
                res.send(false)
            } else {
                res.send(user._id);
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send({message: "Error validating user"});
        });
};
