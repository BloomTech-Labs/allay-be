const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../helpers/users-model.js');
const Revs = require('../helpers/reviews-model.js');

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
router.get('/all', checkForAdmin, (req, res) => {
	User.findUsers()
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: 'There was an error getting all users to dsiplay',
			});
		});
});

//*************** GET USER BY ID *****************//
router.get('/:userId', validateUserId, (req, res) => {
	res.json(res.locals.user);
});

//*************** UPDATE USER INFO ******************//
router.put('/:userId', validateUserId, (req, res) => {
	const { email, password, username, track_id } = req.body;

	const user = res.locals.user;

	if (
		email === user.email &&
		username === user.username &&
		password === user.password &&
		track_id === user.track_id
	) {
		return res.status(200).json({ message: 'No changes to update' });
	} else {
		User.updateUser(user.id, { email, password, username, track_id })
			.then((updatedInfo) => {
				res
					.status(202)
					.json({ updatedInfo: { email, password, username, track_id } });
			})
			.catch((err) => {
				res.status(500).json({ message: 'Error updating user info' });
			});
	}
});

//*************** UPDATE USER BIND STATUS ******************//
router.put('/:userId/bind', checkForAdmin, validateUserId, (req, res) => {
	const {id, blocked} = res.locals.user;

	User.updateUser(id, { blocked: !blocked })
		.then((updatedInfo) => {
			if (updatedInfo) {
				res.status(202).json({ updatedInfo });
			} else {
				res.status(404).json({ message: 'Error locating user info' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error updating user info' });
		});
});

//****************** DELETE ACCOUNT ********************//
router.delete('/:userId', validateUserId, async (req, res) => {
	try {
		const deleted = await User.deleteUser(res.locals.user.id);
		res.status(200).json({ message: 'User account deleted' });
	} catch {
		res.status(500).json({
			message: 'There was an error deleting this account.',
		});
	}
});

/**************************************************************************/

//        for all review endpoints beginning with /users/:id                   //

/**************************************************************************/

//***************** GET USERS REVIEWS *******************//

router.get('/:userId/reviews', validateUserId, (req, res) => {
	res.status(200).json(res.locals.user.reviews);
});

//************* GET A SINGLE REVIEW BY USER ID ***************//

router.get('/:userId/reviews/:revId', validateUserId, validateReviewId, (req, res) => {
	res.status(200).json(res.locals.review);
});

//***************** ADD NEW REVIEW *******************// ===== make sure to update the if else statement====
router.post(
	'/:userId/add-review',
	checkForReviewData,
	validateUserId,
	(req, res) => {
		const user = res.locals.user;

		const review = {...res.locals.newReview, user_id: user.id};

		if (res.locals.authorizedUser.id === user.id) {
			Revs.addReview(review)
				.then((newReview) => {
					res.status(201).json(newReview);
				})
				.catch((err) => {
					res.status(500).json({
						error: 'There was an error check id or review fields',
					});
				});
		} else {
			return res.status(404).json({ error: 'Wrong user' });
		}
	}
);

//************* EDIT A REVIEW WITH USER ID ***************//

router.put(
	'/:userId/reviews/:revId',
	validateUserId,
	validateReviewId,
	checkForReviewData,
	(req, res) => {
	Revs.updateReview(res.locals.review.id, res.locals.newReview)
		.then((updatedReview) => {
			res.status(200).json({updatedReview});
		})
		.catch((err) => {
			res.status(500).json({ error: 'can not edit review' });
		});
});

//************* DELETE A REVIEW BY USER ID ***************//

router.delete(
	'/:userId/reviews/:revId',
	validateUserId,
	validateReviewId,
	(req, res) => {
	Revs.deleteReview(res.locals.review.id)
		.then((deleted) => {
			res.status(200).json(deleted);
		})
		.catch((err) => {
			res.status(500).json({
				error: ' was not able to delete interview review',
			});
		});
});

/**************************************************************************/

module.exports = router;
