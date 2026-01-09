/* 
-/api/minions
    GET /api/minions to get an array of all minions.
    POST /api/minions to create a new minion and save it to the database.
    GET /api/minions/:minionId to get a single minion by id.
    PUT /api/minions/:minionId to update a single minion by id.
    DELETE /api/minions/:minionId to delete a single minion by id. 
*/
const {getFromDatabaseById, getAllFromDatabase} = require('../db')
const express = require('express');
const router = express.Router();

router.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minion', Number(id))
    if (minion) {
        req.minion = minion
        next()
    } else {
        const err = new Error("Could not find minion with id: " + id )
        err.status = 404
        next(err)
    }
})

router.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions')

    if (!minions) {
        const err = new Error("Could not find minion data on server" )
        err.status = 404
        next(err)
    } else {
        res.send(minions);
    }
})

module.exports = router;