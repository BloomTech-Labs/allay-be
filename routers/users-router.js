const router = require('express').Router();

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
	const { userId } = req.params;
	User.findUserById(userId)
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			res.status(500).json({ error: 'There was an error getting user' });
		});
});

//*************** UPDATE USER INFO ******************//
router.put('/:userId', validateUserId, (req, res) => {
	const { email, password, username, track_id } = req.body;
	const { userId } = req.params;
	id = userId;
	User.findUsersBy({ id }).then((userInfo) => {
		const user = userInfo;
		if (
			email === user[0].email &&
			username === user[0].username &&
			password === user[0].password &&
			track_id === user[0].track_id
		) {
			return res.status(200).json({ message: 'No changes to update' });
		} else {
			User.updateUser(id, { email, password, username, track_id })
				.then((updatedInfo) => {
					if (updatedInfo) {
						res
							.status(202)
							.json({ updatedInfo: { email, password, username, track_id } });
					} else {
						res.status(404).json({ message: 'Error locating user info' });
					}
				})
				.catch((err) => {
					res.status(500).json({ message: 'Error updating user info' });
				});
		}
	});
});

//*************** UPDATE USER BIND STATUS ******************//
router.put('/:userId/bind', validateUserId, (req, res) => {
	const { userId } = req.params;

	User.findUserById(userId).then((userInfo) => {
		if (userInfo) {
			User.updateUser(userId, { blocked: !userInfo.blocked })
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
		} else {
			res.status(404).json({ message: 'Error locating user info' });
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
			message: 'There was an error deleting this account.',
		});
	}
});

/**************************************************************************/

//        for all review endpoints beginning with /users/:id                   //

/**************************************************************************/

//***************** GET USERS REVIEWS *******************//

router.get('/:userId/reviews', validateUserId, (req, res) => {
	const { userId } = req.params;
	User.findUserReviews(userId)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => {
			res.status(500).json({
				error: 'Server was not able to retrieve user reviews',
			});
		});
});

//************* GET A SINGLE REVIEW BY USER ID ***************//

router.get(
	'/:userId/reviews/:revId',
	validateUserId,
	validateReviewId,
	(req, res) => {
		const { revId } = req.params;
		User.findUserReviewsById(revId)
			.then((review) => {
				res.status(200).json(review);
			})
			.catch((err) => {
				res
					.status(500)
					.json({ error: 'Could not retrieve single user review.' });
			});
	}
);

//***************** ADD NEW REVIEW *******************// ===== make sure to update the if else statement====
router.post(
	'/:userId/add-review',
	checkForReviewData,
	validateUserId,
	(req, res) => {
		const { userId } = req.params;

		let review = req.body;
		review = { ...review, user_id: userId };

		if (Number(req.user.id) === Number(userId)) {
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
	(req, res) => {
		const { revId } = req.params;

		const changes = req.body;

		Revs.updateReview(revId, changes)
			.then((updatedReview) => {
				if (updatedReview) {
					res.status(200).json({ updatedReview: changes });
				} else {
					res.status(404).json({
						error: 'could not find a valid review',
					});
				}
			})
			.catch((err) => {
				res.status(500).json({ error: 'can not edit review' });
			});
	}
);

//************* DELETE A REVIEW BY USER ID ***************//

router.delete(
	'/:userId/reviews/:revId',
	validateUserId,
	validateReviewId,
	(req, res) => {
		const { revId } = req.params;
		Revs.deleteReview(revId)
			.then((deleted) => {
				res.status(200).json(deleted);
			})
			.catch((err) => {
				res.status(500).json({
					error: ' was not able to delete interview review',
				});
			});
	}
);

/**************************************************************************/

module.exports = router;
