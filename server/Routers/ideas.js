/* 
-/api/ideas
    GET /api/ideas to get an array of all ideas.
    POST /api/ideas to create a new idea and save it to the database.
    GET /api/ideas/:ideaId to get a single idea by id.
    PUT /api/ideas/:ideaId to update a single idea by id.
    DELETE /api/ideas/:ideaId to delete a single idea by id.
*/

const express = require("express");
const {
  getFromDatabaseById,
  getAllFromDatabase,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("../db");
const checkMillionDollarIdea = require("../checkMillionDollarIdea");
const router = express.Router();

router.param("ideaId", (req, res, next, id) => {
  const idea = getFromDatabaseById("ideas", id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    const err = new Error("Could not find idea with id: " + id);
    err.status = 404;
    next(err);
  }
});

router.get("/", (req, res, next) => {
  const ideas = getAllFromDatabase("ideas");
  if (!ideas) {
    const err = new Error("Could not find idea data on server");
    err.status = 404;
    next(err);
  } else {
    res.send(ideas);
  }
});

router.get("/:ideaId", (req, res, next) => {
  res.send(req.idea);
});

router.put("/:ideaId", (req, res, next) => {
  const idea = req.body;
  try {
    res.send(updateInstanceInDatabase("ideas", idea));
  } catch (error) {
    error.status = 422;
    next(error);
  }
});

router.delete("/:ideaId", (req, res, next) => {
  const idea = req.idea;
  const deletion = deleteFromDatabasebyId("ideas", idea.id);

  if (!deletion) {
    const err = new Error("Could not find idea with id: " + idea.id);
    err.status = 404;
    next(err);
  } else {
    res.status(204).send();
  }
});

router.post("/", checkMillionDollarIdea, (req, res, next) => {
  const newIdea = req.body;
  try {
    res.status(201).send(addToDatabase("ideas", newIdea));
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

module.exports = router;
