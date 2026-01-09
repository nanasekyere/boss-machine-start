const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getFromDatabaseById,
  getAllFromDatabase,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("../db");

router.param("workId", (req, res, next, id) => {
  const work = getFromDatabaseById("work", id);
  if (work) {
    req.work = work;
    next();
  } else {
    const err = new Error("Could not find work with id: " + id);
    err.status = 404;
    next(err);
  }
});

router.get("/", (req, res, next) => {
  const work = getAllFromDatabase("work");
  if (!work) {
    const err = new Error("Could not find work data on server");
    err.status = 404;
    next(err);
  }
  const minionWork = work.filter(job => job.minionId === req.minion.id)
  if (!minionWork) {
    const err = new Error("Could not find work for minion with id: " + req.minion.id);
    err.status = 404;
    next(err);
  } else {
    res.send(minionWork)
  }
});

router.post("/", (req, res, next) => {
  const newWork = req.body;
  try {
    res.status(201).send(addToDatabase("work", newWork));
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.put("/:workId", (req, res, next) => {
  const work = req.body;
  try {
    res.send(updateInstanceInDatabase("work", work));
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.delete("/:workId", (req, res, next) => {
  const work = req.work;
  const deletion = deleteFromDatabasebyId("work", work.id);

  if (!deletion) {
    const err = new Error("Could not find work with id: " + work.id);
    err.status = 404;
    next(err);
  } else {
    res.status(204).send();
  }
});



module.exports = router;
