const Food = require('../models/food.model');

exports.create = (req, res) => {
    // Validate request
    if (!req.body.description) {
        return res.status(400).send({
            message: "Food description can not be empty"
        });
    }

    // Create a food
    const food = new Food({
        description: req.body.description,
        phe_multiplier: req.body.phe_multiplier,
        public: req.body.public,
        source_user: req.body.source_user
    });

    // Save food in the database
    food.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the food item."
        });
    });

};

exports.findAll = (req, res) => {
    Food.find({phe_multiplier: {$gt: 0}} )
        .then(foods => {
            res.send(foods);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving foods."
        });
    });
};

exports.findFoodById = (req, res) => {
    Food.findById(req.params.foodId)
        .then(food => {
            if (!food) {
                return res.status(404).send({
                    message: "Food not found with id " + req.params.foodId
                });
            }
            res.send(food);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Food not found with id " + req.params.foodId
            });
        }
        return res.status(500).send({
            message: "Error retrieving food with id " + req.params.foodId
        });
    });
};

exports.findFoodByDescription = (req, res) => {
    Food.findOne( {description: new RegExp(req.params.description, 'i') } )
        .then(food => {
            if (!food) {
                return res.status(404).send({
                    message: "Food not found with the description " + req.params.description
                });
            }
            res.send(food);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Food not found with description " + req.params.description
            });
        }
        return res.status(500).send({
            message: "Error retrieving food with description " + req.params.description
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body._id) {
        return res.status(400).send({
            message: "Food content can not be empty"
        });
    }

    Food.findByIdAndUpdate(req.body._id, {
        description: req.body.description,
        phe_multiplier: req.body.phe_multiplier,
        public: req.body.public,
        source_user: req.body.source_user
    }, {new: true})
        .then(food => {
            if (!food) {
                return res.status(404).send({
                    message: "Food not found with id " + req.body._id
                });
            }
            res.send(food);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Food not found with id " + req.body._id
            });
        }
        return res.status(500).send({
            message: "Error updating food item with id " + req.body._id
        });
    });

};

exports.delete = (req, res) => {
    Food.findByIdAndRemove(req.params.foodId)
        .then(food => {
            if(!food) {
                return res.status(404).send({
                    message: "Food not found with id " + req.params.foodId
                });
            }
            res.send({message: "Food deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Food not found with id " + req.params.foodId
            });
        }
        return res.status(500).send({
            message: "Could not delete food with id " + req.params.foodId
        });
    });

};
