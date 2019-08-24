module.exports = (app) => {
    const food = require('../controllers/food.controller.js');

    app.post('/foods', food.create);
    app.get('/foods', food.findAll);

    app.get('/foods/:foodId', food.findFoodById);
    app.get('/foods/findFoodsByDesc/:description', food.findFoodByDescription);
    app.put('/foods', food.update);
    app.delete('/foods/:foodId', food.delete);
};
