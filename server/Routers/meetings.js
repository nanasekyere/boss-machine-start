/* 
/api/meetings
    GET /api/meetings to get an array of all meetings.
    POST /api/meetings to create a new meeting and save it to the database.
    DELETE /api/meetings to delete all meetings from the database. 
*/

const express = require('express');
const {getFromDatabaseById, getAllFromDatabase} = require('../db')
const router = express.Router();

router.param('meetingId', (req, res, next, id) => {
    const meeting = getFromDatabaseById('meetings', Number(id))
    if (meeting) {
        req.meeting = meeting
        next()
    } else {
        const err = new Error("Could not find meeting with id: " + id )
        err.status = 404
        next(err)
    }
})

router.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings')

    if (!meetings) {
        const err = new Error("Could not find meetoing data on server" )
        err.status = 404
        next(err)
    } else {
        res.send(meetings);
    }
})
module.exports = router;