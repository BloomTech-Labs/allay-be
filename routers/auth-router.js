const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../helpers/users-model.js');
const {
	checkForRegisterData,
	checkForLoginData,
} = require('../middleware/index.js');

const { jwtSecret } = require('../config/secret.js');

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

	User.findUsersBy({ email })
		.first()
		.then((user) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = signToken(user);
				const { id, admin, blocked, first_name, last_name, email } = user;
				res.status(200).json({ token, id, admin, blocked, first_name, last_name, email });
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

/************************* BEGIN CREATE TOKEN *****************************/

//Create TOKEN
function signToken({id, email, admin}) {
	const payload = {id, email, admin};

	const options = {
		expiresIn: '8h',
	};
	return jwt.sign(payload, jwtSecret, options);
}

/************************* END CREATE TOKEN *****************************/

module.exports = router;
