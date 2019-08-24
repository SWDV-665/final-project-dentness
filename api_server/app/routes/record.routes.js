module.exports = (app) => {
    const records = require('../controllers/record.controller.js');
    app.get('/records', records.findAll);
    app.post('/records', records.create);
    app.put('/records', records.update);

    app.get('/records/:recordId', records.findRecordById);
    app.get('/records/findRecordByDateAndUser/:id/:startDate/:endDate', records.findRecordsByDates);
    app.get('/records/:recordId/food/:foodId', records.findFoodById);
    app.delete('/records/:recordId', records.delete);

};
