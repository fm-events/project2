const router = require('express').Router();
const User = require('../models/User.model');

const isLoggedIn = require('../middleware/isLoggedIn');
//const upload = require("../middleware/fileUploader");
const fileUploader = require('../config/cloudinary.config');

//READ: display user profile
router.get('/profile', isLoggedIn, (req, res, next) => {
  const userId = req.session.user._id;

  User.findById(userId)
    .then((user) => {
      res.render('profile/profile-page', user);
    })
    .catch((err) => console.log(err));
});

//UPDATE: display form
router.get('/profile/edit', isLoggedIn, (req, res, next) => {
  const userId = req.session.user._id;

  User.findById(userId)
    .then((user) => {
      res.render('profile/edit-profile', user);
    })
    .catch((err) => console.log(err));
});

//UPDATE: process form
router.post(
  '/profile/edit',
  isLoggedIn,
  fileUploader.single('profilePicture'),
  (req, res, next) => {
    const userId = req.session.user._id;

    const { username, email } = req.body;

    let profilePicture;
    if (req.file) {
      profilePicture = req.file.path;
    } else {
      profilePicture = "";
    }

    User.findByIdAndUpdate(
      userId,
      { username, email, profilePicture },
      { new: true }
    )
      .then(() => {
        res.redirect(`/profile`);
      })
      .catch((err) => console.log(err));
  }
);

//DELETE: user profile
router.post('/profile/delete', isLoggedIn, (req, res, next) => {
  const userId = req.session.user._id;

  User.findByIdAndDelete(userId)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
});

module.exports = router;
