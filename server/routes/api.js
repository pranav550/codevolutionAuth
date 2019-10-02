const express = require("express");
const User = require("../models/user")
const jwt = require('jsonwebtoken');
const router = express.Router()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/auth', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected")
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorised Request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorised Request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorised Request')
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send('From Api Route ')
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id };

            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ registeredUser, token })
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send("invalid Email")
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('invalid password')
                } else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ user, token })
                }
            }
        }
    })
})


router.get('/events', (req, res) => {
    let events = [{
            "_id": "1",
            "name": "test1",
            "description": "loreum ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "tes2",
            "description": "loreum ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "test3",
            "description": "loreum ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "test4",
            "description": "loreum ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})


router.get('/special', (req, res) => {
    let events = [{
            "_id": "1",
            "name": "test1",
            "description": "loreum ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "tes2",
            "description": "loreum ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "test3",
            "description": "loreum ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "test4",
            "description": "loreum ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})

module.exports = router