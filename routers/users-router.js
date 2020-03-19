const router = require('express').Router();

const User = require('../helpers/users-model.js');
const IRevs = require('../helpers/interview-reviews-model');
const CRevs = require('../helpers/company-reviews-model.js');
const {
  validateUserId,
  checkForCompanyReviewData,
  validateCompanyReviewId,
  checkForInterviewReviewData,
  validateInterviewReviewId
} = require('../middleware/index.js');

/**************************************************************************/

//                  for users endpoints beginning with /users                   //

/**************************************************************************/

//*************** GET ALL USERS *****************// - Remove for production or create new auth for admin only access to this endpoint
router.get('/all', (req, res) => {
  User.findUsers()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'There was an error getting all users to dsiplay'
      });
    });
});

//*************** GET USER BY ID *****************//
router.get('/:userId', validateUserId, (req, res) => {
  const { userId } = req.params;
  User.findUserById(userId)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json(err, { error: 'There was an error getting user' });
    });
});

//*************** UPDATE USER INFO ******************//
router.put('/:userId', validateUserId, (req, res) => {
  const { email, password, username, track_name } = req.body;
  const { userId } = req.params;
  id = userId;
  User.findUsersBy({ id }).then(userInfo => {
    const user = userInfo;
    if (
      email === user[0].email &&
      username === user[0].username &&
      password === user[0].password &&
      track_name === user[0].track_name
    ) {
      return res.status(200).json({ message: 'No changes to update' });
    } else {
      User.updateUser(id, { email, password, username, track_name })
        .then(info => {
          if (info) {
            res
              .status(202)
              .json({ info: { email, password, username, track_name } });
          } else {
            res.status(404).json({ message: 'Error locating user info' });
          }
        })
        .catch(err => {
          res.status(500).json({ message: 'Error updating user info' });
        });
    }
  });
});

//****************** DELETE ACCOUNT ********************//
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findUserById(userId);
    if (user) {
      const deleted = await User.deleteUser(userId);
      res.status(200).json({ message: 'User account deleted' });
    } else {
      res.status(404).json({ message: 'Error locating user.' });
    }
  } catch {
    res.status(500).json({
      message: 'There was an error deleting this account.'
    });
  }
});

/**************************************************************************/

//        for company interview endpoints beginning with /users/:id                   //

/**************************************************************************/

//***************** GET USERS COMPANY REVIEWS *******************//

router.get('/:userId/company-reviews', validateUserId, (req, res) => {
  const { userId } = req.params;

  User.findUserCompanyReviews(userId)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json(err, {
        error: 'There was an error getting user company reviews.'
      });
    });
});

//***************** GET USERS SINGLE COMPANY REVIEW BY ID*******************//
router.get(
  '/:userId/company-review/:revId',
  validateUserId,
  validateCompanyReviewId,
  (req, res) => {
    const { userId, revId } = req.params;

    User.findUserCompanyReviewById(revId)
      .then(userReview => {
        res.status(200).json(userReview);
      })
      .catch(err => {
        res.status(500).json(err, {
          error: 'There was an error getting a single user company review'
        });
      });
  }
);

//***************** ADD NEW COMPANY REVIEW *******************// ===== make sure to update the if else statement====
router.post(
  '/:userId/add-company-review',
  checkForCompanyReviewData,
  validateUserId,
  (req, res) => {
    console.log(req.body);
    const { userId } = req.params;

    let companyReview = req.body;
    companyReview = { ...companyReview, user_id: userId };

    // if (Number(req.user.id) === Number(id)) {
    CRevs.addCompanyReview(companyReview)
      .then(newReview => {
        console.log(newReview);
        res.status(201).json(newReview);
      })
      .catch(err => {
        res
          .status(500)
          .json(err, { error: 'There was an error check id or review fields' });
      });
    //   } else {
    //     return res.status(404).json({ error: 'Wrong user' });
    //   }
  }
);
//************* EDIT A COMPANY REVIEW WITH USER ID ***************//

router.put(
  '/:userId/company-reviews/:revId',
  checkForCompanyReviewData,
  validateCompanyReviewId,
  validateUserId,
  (req, res) => {
    const { revId } = req.params;

    const changes = req.body;

    CRevs.updateCompanyReview(revId, changes)
      .then(updatedReview => {
        if (updatedReview) {
          res.status(200).json({ updatedReview: changes });
        } else {
          res.status(404).json(err, {
            error: 'could not find a valid company review'
          });
        }
      })
      .catch(err => {
        res.status(500).json(err, { error: 'can not edit company review' });
      });
  }
);

//************* DELETE A COMPANY REVIEW BY USER ID ***************//

router.delete(
  '/:userId/company-reviews/:revId',
  validateUserId,
  validateCompanyReviewId,
  (req, res) => {
    const { revId } = req.params;
    CRevs.deleteCompanyReview(revId)
      .then(deleted => {
        res.status(200).json(deleted);
      })
      .catch(err => {
        res.status(500).json(err, {
          error: ' was not able to delete company review'
        });
      });
  }
);

/**************************************************************************/

//           for interview review endpoints beginning with /users/:id                   //

/**************************************************************************/

//***************** GET USERS INTERVIEW REVIEWS *******************//

router.get(
  '/:userId/interview-reviews',
  validateUserId,

  (req, res) => {
    const { userId } = req.params;

    User.findUserInterviewReviews(userId)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json(err, {
          error: 'There was an error getting user interview reviews'
        });
      });
  }
);

//************* GET A SINGLE REVIEW BY USER ID ***************//

router.get(
  '/:userId/interview-review/:revId',
  validateUserId,
  validateInterviewReviewId,
  (req, res) => {
    const { revId } = req.params;

    User.findUserInterviewReviewById(revId)
      .then(userReview => {
        res.status(200).json(userReview);
      })
      .catch(err => {
        res.status(500).json(err, {
          error: 'There was an error getting a single user interview review'
        });
      });
  }
);

//***************** ADD NEW INTERVIEW REVIEW *******************// ===== make sure to update the if else statement====
router.post(
  '/:userId/add-interview-review',
  checkForInterviewReviewData,
  validateUserId,
  (req, res) => {
    const { userId } = req.params;

    let interviewReview = req.body;
    interviewReview = { ...interviewReview, user_id: userId };

    // if (Number(req.user.id) === Number(id)) {
    IRevs.addInterviewReview(interviewReview)
      .then(newReview => {
        res.status(201).json(newReview);
      })
      .catch(err => {
        res
          .status(500)
          .json(err, { error: 'There was an error check id or review fields' });
      });
    //   } else {
    //     return res.status(404).json({ error: 'Wrong user' });
    //   }
  }
);

//************* EDIT A INTERVIEW REVIEW WITH USER ID ***************//

router.put(
  '/:userId/interview-reviews/:revId',
  validateUserId,
  validateInterviewReviewId,
  (req, res) => {
    const { revId } = req.params;

    const changes = req.body;

    IRevs.updateInterviewReview(revId, changes)
      .then(updatedReview => {
        if (updatedReview) {
          res.status(200).json({ updatedReview: changes });
        } else {
          res.status(404).json(err, {
            error: 'could not find a valid interview review'
          });
        }
      })
      .catch(err => {
        res.status(500).json(err, { error: 'can not edit interview review' });
      });
  }
);

//************* DELETE A COMPANY REVIEW BY USER ID ***************//

router.delete(
  '/:userId/interview-reviews/:revId',
  validateUserId,
  validateInterviewReviewId,
  (req, res) => {
    const { revId } = req.params;
    IRevs.deleteInterviewReview(revId)
      .then(deleted => {
        res.status(200).json(deleted);
      })
      .catch(err => {
        res.status(500).json(err, {
          error: ' was not able to delete interview review'
        });
      });
  }
);

/**************************************************************************/

module.exports = router;
