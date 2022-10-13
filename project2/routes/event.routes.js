const router = require('express').Router();
const Event = require('../models/Event.model');
//const User = require("../models/User.model");

//const isLoggedIn = require("../middleware/isLoggedIn");

//READ: List all events
//get /events
router.get('/events', (req, res, next) => {
  Event.find()
    .then((events) => {
      res.render('events/events-list', { events: events });
    })
    .catch();
});

//CREATE: display form
// get /events/create
router.get('/events/create', (req, res, next) => {
  res.render('events/create-event');
});

//CREATE: process form
// post /events/create
router.post('/events/create', (req, res, next) => {
  const newEvent = {
    title: req.body.title,
    location: req.body.location,
    maxAttendees: req.body.maxAttendees,
    date: req.body.date,
    time: req.body.time,
    description: req.body.description,
    //organizer: req.body.organizer,
  };
  Event.create(newEvent)
    .then(() => res.redirect('/events'))
    .catch((err) => console.log(err));
});

//READ: Event Details
//get events/:eventId
router.get('/events/:eventId', (req, res, next) => {
  const eventId = req.params.eventId;

  Event.findById(eventId)
    .then((event) => {
      res.render('events/event-details', event);
    })
    .catch();
});

//UPDATE: display form
// get /events/:eventId/edit
router.get('/events/:eventId/edit', (req, res, next) => {
  const eventId = req.params.eventId;

  Event.findById(eventId)
    .then((event) => {
      res.render('events/edit-event', event);
    })
    .catch();
});

//UPDATE: process form
// post /events/:eventId/edit
router.post('/events/:eventId/edit', (req, res, next) => {
  const eventId = req.params.eventId;

  const newDetails = {
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    date: req.body.date,
    time: req.body.time,
    //organizer: req.body.organizer,
    maxAttendees: req.body.maxAttendees,
  };
  Event.findByIdAndUpdate(eventId, newDetails)
    .then(() => {
      res.redirect(`/events/${eventId}`);
    })
    .catch();
});

//DELETE:
// post /events/:eventId/delete

router.post('/events/:eventId/delete', (req, res, next) => {
  Event.findByIdAndDelete(req.params.eventId)
    .then(() => {
      res.redirect('/events');
    })
    .catch((err) => {
      console.log('Error deleting book...', err);
      next();
    });
});

module.exports = router;
