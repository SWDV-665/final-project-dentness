module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    app.post('/users', users.create);
    app.get('/users', users.findAll);
    app.put('/users', users.update);

    app.get('/users/:userId', users.findUserById);
    app.get('/users/find/:email', users.findUserByEmail);
    app.get('/users/login/:email/:password', users.login);
    app.delete('/users/:userId', users.delete);
};
