const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../helpers/users-model.js');
const {
	checkForRegisterData,
	checkForLoginData,
} = require('../middleware/index.js');
const signToken = require('../config/token');

/**************************************************************************/

//               for endpoints beginnings with /api/auth                  //

/*************************** BEGIN REGISTER *******************************/

router.post('/register', checkForRegisterData, (req, res) => {
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
		portfolio
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
		portfolio
	};
	User.addUser(user)
		.then(newUser => {
			const token = signToken(newUser);
			res.status(201).json({token, user: newUser});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'There was an error signing up.' });
		});
});
/*************************** END REGISTER *******************************/

/*************************** BEGIN LOGIN *******************************/

router.post('/login', checkForLoginData, (req, res) => {
	let { email, password } = res.locals.newUser;
	// console.log(req.body, 'req.body ln 36');

	User.findUsersBy({email}, true)
		.then((user) => {
			if (user) {
				User.findUserPassword(user.id)
					.then(({password: pass}) => {
					  if (bcrypt.compareSync(password, pass)) {
							const token = signToken(user);
							const { id, admin, blocked, first_name, last_name, email } = user;
							res.status(200).json({ token, id, admin, blocked, first_name, last_name, email });
						} else {
					  	res.status(500).json({message: 'Invalid Credentials'});
						}
					})
					.catch(err => {
						console.log(err);
						res.status(500).json({message: 'There was an error signing in'});
					});
			} else {
				res.status(401).json({ message: 'Invalid Credentials' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'There was an error signing in' });
		});
});

/*************************** END LOGIN *******************************/

module.exports = router;
