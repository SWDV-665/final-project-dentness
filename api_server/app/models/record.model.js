const  mongoose = require('mongoose');

const DietRecordDetailSchema = exports.DietRecordDetail = mongoose.Schema({
    weight: { type: mongoose.Schema.Types.Number, required: true },
    phe: { type: mongoose.Schema.Types.Number, required: true },
    food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true }
});

const DietRecordSchema = mongoose.Schema({
    date: { type: mongoose.Schema.Types.Date, required: true },
    target_phe_level: { type: mongoose.Schema.Types.Number, required: true },
    actual_phe_level: { type: mongoose.Schema.Types.Number, required: true },
    owner: { type: String, required: true },
    note: { type: String, required: false },
    diet_record_details: { type: [DietRecordDetailSchema] }
});

module.exports.DietRecord = mongoose.model('DietRecords', DietRecordSchema );
module.exports.DietRecordDetail = mongoose.model('DietRecordDetails', DietRecordDetailSchema );

