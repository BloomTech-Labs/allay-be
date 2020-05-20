const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../helpers/users-model.js');
const {
  checkForRegisterData,
  checkForLoginData,
} = require('../middleware/index.js');
const signToken = require('../config/token');
const {DUPLICATE_USER_ERROR} = require('../config/errors');

/**************************************************************************/

//               for endpoints beginnings with /api/auth                  //

/*************************** BEGIN REGISTER *******************************/
router.post('/register', checkForRegisterData, async (req, res) => {
  let {
    email,
    password,
    track_id,
    first_name,
    last_name,
    cohort,
    contact_email,
    location,
    graduated,
    highest_ed,
    field_of_study,
    prior_experience,
    tlsl_experience,
    employed_company,
    employed_title,
    employed_remote,
    employed_start,
    resume,
    linked_in,
    slack,
    github,
    dribble,
    profile_image,
    portfolio,
  } = req.body;
  password = bcrypt.hashSync(password, 3); //Change in production!!!
  const user = {
    email,
    password,
    track_id,
    first_name,
    last_name,
    cohort,
    contact_email,
    location,
    graduated,
    highest_ed,
    field_of_study,
    prior_experience,
    tlsl_experience,
    employed_company,
    employed_title,
    employed_remote,
    employed_start,
    resume,
    linked_in,
    slack,
    github,
    dribble,
    profile_image,
    portfolio,
  };

  try {
    const newUser = await User.addUser(user);
    const token = signToken(newUser);
    res.status(201).json({token, user: newUser});
  } catch (e) {
    if (e.code === '23505')
      return res.status(409).json({error: DUPLICATE_USER_ERROR});

    console.log(e);
    res.status(500).json({error: 'There was an error signing up.'});
  }
});
/*************************** END REGISTER *******************************/

/*************************** BEGIN LOGIN *******************************/
router.post('/login', checkForLoginData, async (req, res) => {
  let {email, password} = res.locals.newUser;

  try {
    const user = await User.findUsersBy({email}).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = signToken(user);
      const {id, admin, blocked, first_name, last_name, email} = user;
      res.json({token, id, admin, blocked, first_name, last_name, email}); // put user object here
    } else {
      res.status(401).json({message: 'Invalid Credentials'});
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({error: 'There was an error signing in'});
  }
});

/*************************** END LOGIN *******************************/

module.exports = router;
