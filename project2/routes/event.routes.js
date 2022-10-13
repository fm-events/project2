const router = require('express').Router();
const Event = require('../models/Event.model');
//const User = require("../models/User.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const fileUploader = require('../config/cloudinary.config');


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
router.get('/events/create', isLoggedIn, (req, res, next) => {
  res.render('events/create-event');
});

//CREATE: process form
// post /events/create
router.post('/events/create', isLoggedIn, (req, res, next) => {
  const organizer = req.session.user._id;
  const {title, location, maxAttendees, date, time, description} = req.body

  const newEvent = {
    title,
    location,
    maxAttendees,
    date,
    time,
    description,
    organizer,
  };

  Event.create(newEvent)
    .then(() => console.log(newEvent))//res.redirect('/events'))
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
    .populate("organizer")
    .then((event) => {
      res.render('events/edit-event', event);
    })
    .catch();
});

//UPDATE: process form
// post /events/:eventId/edit
router.post('/events/:eventId/edit', isLoggedIn, fileUploader.single("eventPicture"), (req, res, next) => {
  const eventId = req.params.eventId;
  
  const { title, description, location, date, time, maxAttendees} = req.body.title;
  
  let eventPicture;
  if (req.file) {
      eventPicture = req.file.path;
  } else {
      eventPicture = existingImage;
  }

  Event.findByIdAndUpdate(eventId, {title, description, location, date, time, maxAttendees, eventPicture}, {new: true})
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
