const express = require('express');
const api = express.Router();

const minionsRouter = require('./Routers/minions')
const ideasRouter = require('./Routers/ideas')
const meetingsRouter = require('./Routers/meetings')

api.use('/minions', minionsRouter)
api.use('/ideas', ideasRouter)
api.use('/meetings', meetingsRouter)

module.exports = api;
