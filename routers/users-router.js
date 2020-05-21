const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../helpers/users-model.js');
const Revs = require('../helpers/reviews-model.js');

const {
  GET_ALL_USER_ERROR,
  UPDATE_USER_ERROR,
  DELETE_USER_ERROR,
  WRONG_USER_ERROR,
  DUPLICATE_USER_ERROR,
  ADD_REVIEW_ERROR,
  UPDATE_REVIEW_ERROR,
  DELETE_REVIEW_ERROR,
} = require('../config/errors.js');

const {
  validateUserId,
  checkForReviewData,
  validateReviewId,
  checkForAdmin,
} = require('../middleware/index.js');

/**************************************************************************/

//                  for users endpoints beginning with /users                   //

/**************************************************************************/

//*************** GET ALL USERS *****************// - Remove for production or create new auth for admin only access to this endpoint
router.get('/all', checkForAdmin, async (req, res) => {
  try {
    const users = await User.findUsers();
    res.json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json({message: GET_ALL_USER_ERROR});
  }
});

//*************** GET USER BY ID *****************//
router.get('/:userId', validateUserId, (req, res) => {
  res.json(res.locals.user);
});

//*************** UPDATE USER INFO ******************//
router.put('/:userId', validateUserId, async (req, res) => {
  const user = res.locals.user;

  const {
    email = user.email,
    password,
    track_id = user.track_id,
    first_name = user.first_name,
    last_name = user.last_name,
    cohort = user.cohort,
    contact_email = user.contact_email,
    location = user.location,
    graduated = user.graduated,
    highest_ed = user.highest_ed,
    field_of_study = user.field_of_study,
    prior_experience = user.prior_experience,
    tlsl_experience = user.tlsl_experience,
    employed_company = user.employed_company,
    employed_title = user.employed_title,
    employed_remote = user.employed_remote,
    employed_start = user.employed_start,
    resume = user.resume,
    linked_in = user.linked_in,
    slack = user.slack,
    github = user.github,
    dribble = user.dribble,
    profile_image = user.profile_image,
    portfolio = user.portfolio,
  } = req.body;

  const updates = {
    email,
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

  if (password) updates.password = bcrypt.hashSync(password, 3);

  try {
    const updatedUser = await User.updateUser(user.id, updates);
    res.json(updatedUser);
  } catch (e) {
    if (e.code === '23505')
      return res.status(409).json({error: DUPLICATE_USER_ERROR});

    console.log(e);
    res.status(500).json({message: UPDATE_USER_ERROR});
  }
});

//*************** UPDATE USER BIND STATUS ******************//
router.put('/:userId/bind', checkForAdmin, validateUserId, async (req, res) => {
  const {id, blocked} = res.locals.user;

  try {
    const updatedUser = await User.updateUser(id, {blocked: !blocked});
    res.status(202).json({updatedInfo: updatedUser}); // change to 200 and remove object wrapping
  } catch (e) {
    console.log(e);
    res.status(500).json({message: UPDATE_USER_ERROR});
  }
});

//****************** DELETE ACCOUNT ********************//
router.delete('/:userId', validateUserId, async (req, res) => {
  try {
    await User.deleteUser(res.locals.user.id);
    res.json({message: 'User account deleted'});
  } catch (e) {
    console.log(e);
    res.status(500).json({message: DELETE_USER_ERROR});
  }
});

/**************************************************************************/

//        for all review endpoints beginning with /users/:id                   //

/**************************************************************************/

//***************** GET USERS REVIEWS *******************//
router.get('/:userId/reviews', validateUserId, (req, res) => {
  res.json(res.locals.user.reviews);
});

//************* GET A SINGLE REVIEW BY USER ID ***************//
router.get(
  '/:userId/reviews/:revId',
  validateUserId,
  validateReviewId,
  (req, res) => {
    res.json(res.locals.review);
  }
);

//***************** ADD NEW REVIEW *******************// ===== make sure to update the if else statement====
router.post(
  '/:userId/add-review',
  checkForReviewData,
  validateUserId,
  async (req, res) => {
    const user = res.locals.user;

    const review = {...res.locals.newReview, user_id: user.id};

    if (res.locals.authorizedUser.id === user.id) {
      // Create middleware to check for self
      try {
        const newReview = await Revs.addReview(review);
        res.status(201).json(newReview);
      } catch (e) {
        console.log(e);
        res.status(500).json({message: ADD_REVIEW_ERROR});
      }
    } else {
      res.status(404).json({message: WRONG_USER_ERROR});
    }
  }
);

//************* EDIT A REVIEW WITH USER ID ***************//
router.put(
  '/:userId/reviews/:revId',
  validateUserId,
  validateReviewId,
  checkForReviewData,
  async (req, res) => {
    try {
      const updatedReview = await Revs.updateReview(
        res.locals.id,
        res.locals.newReview
      );
      res.json(updatedReview);
    } catch (e) {
      console.log(e);
      res.status(500).json({message: UPDATE_REVIEW_ERROR});
    }
  }
);

//************* DELETE A REVIEW BY USER ID ***************//
router.delete(
  '/:userId/reviews/:revId',
  validateUserId,
  validateReviewId,
  async (req, res) => {
    try {
      const deleted = await Revs.deleteReview(res.locals.review.review_id);
      res.json(deleted);
    } catch (e) {
      console.log(e);
      res.status(500).json({message: DELETE_REVIEW_ERROR});
    }
  }
);

/**************************************************************************/

module.exports = router;
