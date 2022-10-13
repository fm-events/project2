const router = require('express').Router();
const User = require("../models/User.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const upload = require("../middleware/fileUploader")


//READ: display user profile
router.get('/profile', isLoggedIn, (req, res, next) => {
    const userId = req.session.user._id;

    User.findById(userId)
        .then( (user) => {
            res.render('profile/profile-page', user);
        })
        .catch(err => console.log(err))
        
});

//UPDATE: display form
router.get('/profile/edit', isLoggedIn, (req, res, next) => {
    const userId = req.session.user._id;

    User.findById(userId)
        .then( (user) => {
            res.render('profile/edit-profile', user);
        })
        .catch(err => console.log(err))
});

//UPDATE: process form
router.post('/profile/edit', isLoggedIn, upload.single("profilePicture"), (req, res, next) => {
    const userId = req.session.user._id;
    
    const newDetails = {
        username: req.body.username,
        email: req.body.email,
        profilePicture: req.file.path.profilePicture,
      };
      User.findByIdAndUpdate(userId, newDetails)
        .then(() => {
          res.redirect(`/profile`);
        })
        .catch(err => console.log(err));
});

//DELETE: user profile
router.post('/profile/delete', isLoggedIn, (req, res, next) => {
    const userId = req.session.user._id;

    User.findByIdAndDelete(userId)
        .then( () => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
});


module.exports = router;
  