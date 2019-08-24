const Records = require('../models/record.model');
const Foods = require('../models/food.model');

exports.create = (req, res) => {
    // Create a food
    const record = new Records.DietRecord({
        date: req.body.date,
        target_phe_level: req.body.target_phe_level,
        actual_phe_level: req.body.actual_phe_level,
        owner: req.body.owner,
        note: req.body.note,
        diet_record_details: req.body.diet_record_details
    });

    // Save food in the database
    record.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the food item."
        });
    });
};
exports.findAll = (req, res) => {
    Records.DietRecord.find()
        .then(record => {
            res.send(record);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving diet records."
        });
    });
};
exports.update = (req, res) => {
    Records.DietRecord.findByIdAndUpdate(req.body._id, {
        date: req.body.date,
        target_phe_level: req.body.target_phe_level,
        actual_phe_level: req.body.actual_phe_level,
        owner: req.body.owner,
        note: req.body.note,
        diet_record_details: req.body.diet_record_details
    }, {new: true}).populate('food')
        .then(record => {
            if (!record) {
                return res.status(404).send({
                    message: "Diet record not found with id " + req.body._id
                });
            }
            res.send(record);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Diet record not found with id " + req.body._id
            });
        }
        return res.status(500).send({
            message: "Error updating diet record item with id " + req.body._id
        });
    });
};
exports.findRecordById = (req, res) => {
    console.log("findRecordById...");
    Records.DietRecord.findById(req.params.recordId).populate({
        path: 'diet_record_details.food',
        model: 'Foods',
    })
        .then(record => {
            if (!record) {
                return res.status(404).send({
                    message: "Diet record not found with id " + req.params.recordId
                });
            }
            res.send(record);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Diet record not found with id " + req.params.recordId
            });
        }
        return res.status(500).send({
            message: "Error retrieving diet record with id " + req.params.recordId
        });
    });
};
exports.findFoodById = (req, res) => {
    Records.DietRecord.findById(req.params.recordId)
        .then(record => {
            if (!record) {
                return res.status(404).send({
                    message: "Diet record not found with id " + req.params.recordId
                });
            }
            const food = record.diet_record_details.id(req.params.foodId);
            res.send(food || {});
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Diet record not found with id " + req.params.recordId
            });
        }
        return res.status(500).send({
            message: err.message //"Error retrieving diet record with id " + req.params.recordId
        });
    });
};

exports.findRecordsByDates = (req, res) => {
    Records.DietRecord.find({
        owner: { $eq: req.params.id },
        date: {
                $gte: new Date(req.params.startDate),
                $lte:  new Date(req.params.endDate)
        }})
        .then(record => {
            res.send(record);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving diet records."
        });
    });

};
exports.delete = (req, res) => {
    Records.DietRecord.findByIdAndRemove(req.params.recordId)
        .then(record => {
            if(!record) {
                return res.status(404).send({
                    message: "Diet Record not found with id " + req.params.recordId
                });
            }
            res.send({message: "Diet Record deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Diet Record not found with id " + req.params.recordId
            });
        }
        return res.status(500).send({
            message: "Could not delete food with id " + req.params.foodId
        });
    });

};

