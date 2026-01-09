/* 
/api/meetings
    GET /api/meetings to get an array of all meetings.
    POST /api/meetings to create a new meeting and save it to the database.
    DELETE /api/meetings to delete all meetings from the database. 
*/

const express = require("express");
const {
  getFromDatabaseById,
  getAllFromDatabase,
  addToDatabase,
  createMeeting,
  deleteAllFromDatabase,
} = require("../db");
const router = express.Router();

router.param("meetingId", (req, res, next, id) => {
  const meeting = getFromDatabaseById("meetings", id);
  if (meeting) {
    req.meeting = meeting;
    next();
  } else {
    const err = new Error("Could not find meeting with id: " + id);
    err.status = 404;
    next(err);
  }
});

router.get("/", (req, res, next) => {
  const meetings = getAllFromDatabase("meetings");

  if (!meetings) {
    const err = new Error("Could not find meeting data on server");
    err.status = 404;
    next(err);
  } else {
    res.send(meetings);
  }
});

router.post("/", (req, res, next) => {
  const newMeeting = createMeeting();
  try {
    res.status(201).send(addToDatabase("meetings", newMeeting));
  } catch (error) {
    error.status(400);
    next(error);
  }
});

router.delete("/", (req, res, next) => {
  const deletion = deleteAllFromDatabase("meetings");
  if (!deletion) {
    const err = new Error("Could not delete all meetings");
    err.status = 400;
    next(err);
  } else {
    res.status(204).send(deletion);
  }
});

module.exports = router;
