/* 
-/api/minions
    GET /api/minions to get an array of all minions.
    POST /api/minions to create a new minion and save it to the database.
    GET /api/minions/:minionId to get a single minion by id.
    PUT /api/minions/:minionId to update a single minion by id.
    DELETE /api/minions/:minionId to delete a single minion by id. 
*/
const {
  getFromDatabaseById,
  getAllFromDatabase,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("../db");
const express = require("express");
const router = express.Router();

const workRouter = require('./work');
router.use('/:minionId/work', workRouter);

router.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    const err = new Error("Could not find minion with id: " + id);
    err.status = 404;
    next(err);
  }
});

router.get("/", (req, res, next) => {
  const minions = getAllFromDatabase("minions");

  if (!minions) {
    const err = new Error("Could not find minion data on server");
    err.status = 404;
    next(err);
  } else {
    res.send(minions);
  }
});

router.get("/:minionId", (req, res, next) => {
  res.send(req.minion);
});

router.put("/:minionId", (req, res, next) => {
  const minion = req.body;
  try {
    res.send(updateInstanceInDatabase("minions", minion));
  } catch (error) {
    error.status = 422;
    next(error);
  }
});

router.delete("/:minionId", (req, res, next) => {
  const minion = req.minion;
  const deletion = deleteFromDatabasebyId("minions", minion.id);

  if (!deletion) {
    const err = new Error("Could not find minion with id: " + minion.id);
    err.status = 404;
    next(err);
  } else {
    res.status(204).send();
  }
});

router.post("/", (req, res, next) => {
  const newMinion = req.body;

  try {
    res.status(201).send(addToDatabase("minions", newMinion));
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

module.exports = router;
