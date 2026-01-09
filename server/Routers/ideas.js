/* 
-/api/ideas
    GET /api/ideas to get an array of all ideas.
    POST /api/ideas to create a new idea and save it to the database.
    GET /api/ideas/:ideaId to get a single idea by id.
    PUT /api/ideas/:ideaId to update a single idea by id.
    DELETE /api/ideas/:ideaId to delete a single idea by id.
*/

const express = require('express');
const {getFromDatabaseById, getAllFromDatabase} = require('../db')
const router = express.Router();

router.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', Number(id))
    if (idea) {
        req.idea = idea
        next()
    } else {
        const err = new Error("Could not find idea with id: " + id )
        err.status = 404
        next(err)
    }
})

router.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas')

    if (!ideas) {
        const err = new Error("Could not find meetoing data on server" )
        err.status = 404
        next(err)
    } else {
        res.send(ideas);
    }
})


module.exports = router;