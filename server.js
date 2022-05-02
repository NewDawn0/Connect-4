const express = require('express');
const Datastore = require('nedb');
const app = express();
const database = new Datastore('database.db');
database.loadDatabase();

app.listen(3000, () => console.log('Server started on port 127.0.0.1:3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));


function User(name, password, wins, losses, draws, inGame) {
    this.name = name;
    this.passwd = password;
    this.wins = wins;
    this.losses = losses;
    this.draws = draws;
    this.inGame = inGame;
}
app.post('/api/userUpdate', (request, response) => {
    console.log(request.body);
    database.findOne({"name":request.body.user}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json({
            name : data.name,
            wins : data.wins,
            losses : data.losses,
            draws : data.draws,
            inGame : data.inGame,
            success: true,
            message: "Updated user"
        });
    });
});
app.post('/api/userSignup', (request, response) => {
    console.log(request.body);
    user = new User(request.body.user, request.body.pwd, 0, 0, 0, false);
    database.findOne({"name":user.name}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        if (data) {
            response.json({
                success: false,
                message: "User already exists"
            });
            return;
        }
        database.insert(user);
        response.json({
            success: true,
            message: "User created"
        });
    });
});
app.post('/api/userSignin', (request, response) => {
    console.log(request.body);
    database.findOne({"name":request.body.user}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        if (!data || data.passwd != request.body.pwd) {
            response.json({
                success: false,
                message: "Password or Username incorrect"
            });
            return;
        }
        response.json({
            name : data.name,
            wins : data.wins,
            losses : data.losses,
            draws : data.draws,
            inGame : data.inGame,
            success: true,
            message: "User logged in"
        });
    });
});
app.get('/api/users', (request, response) => {
    database.find({"inGame":false}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});
app.post('/api/userWin', (request, response) => {
    console.log(request.body);
    database.findOne({"name":request.body.user}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        if (!data) {
            response.json({
                success: false,
                message: "User not found"
            });
            return;
        }
        data.wins++;
        database.update({"name":request.body.user}, data);
        response.json({
            success: true,
            message: "User updated"
        });
    });
});
app.post('/api/userLosses', (request, response) => {
    console.log(request.body);
    database.findOne({"name":request.body.user}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        if (!data) {
            response.json({
                success: false,
                message: "User not found"
            });
            return;
        }
        data.losses++;
        database.update({"name":request.body.user}, data);
        response.json({
            success: true,
            message: "User updated"
        });
    });
});
app.post('/api/userDraws', (request, response) => {
    console.log(request.body);
    database.findOne({"name":request.body.user}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        if (!data) {
            response.json({
                success: false,
                message: "User not found"
            });
            return;
        }
        data.draws++;
        database.update({"name":request.body.user}, data);
        response.json({
            success: true,
            message: "User updated"
        });
    });
});