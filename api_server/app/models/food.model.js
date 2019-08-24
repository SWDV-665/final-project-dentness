let mongoose = require('mongoose');

let FoodSchema = new mongoose.Schema({
    description: { type: String, required: true },
    phe_multiplier: { type: mongoose.Schema.Types.Number, required: true },
    public: {type: mongoose.Schema.Types.Boolean, required: true, default: false},
    source_user: {type: String, required: true}
});

module.exports = mongoose.model('Foods', FoodSchema);
