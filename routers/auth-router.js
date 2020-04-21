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
	let { username, password, track_id, email } = req.body;
	password = bcrypt.hashSync(password, 3); //Change in production!!!

	User.addUser({ username, password, track_id, email })
		.then((newUser) => {
			const token = signToken(newUser);
			const { username: name, id, admin, blocked } = newUser;
			res.status(201).json({ username: name, token, id, admin, blocked });
		})
		.catch((err) => {
			res.status(500).json({ error: 'There was an error signing up.' });
		});
});
/*************************** END REGISTER *******************************/

/*************************** BEGIN LOGIN *******************************/

router.post('/login', checkForLoginData, (req, res) => {
	let { username, password } = req.body;
	// console.log(req.body, 'req.body ln 36');

	User.findUsersBy({ username })
		.first()
		.then((user) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = signToken(user);
				const { id, username: name, admin, blocked } = user;

				res.status(200).json({ username: name, token, id, admin, blocked });
			} else {
				res.status(401).json({ message: 'Invalid Credentials' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'There was an error signing in' });
		});
});

/*************************** END LOGIN *******************************/

/************************* BEGIN CREATE TOKEN *****************************/

//Create TOKEN
function signToken(user) {
	const payload = {
		id: user.id,
		email: user.username,
		admin: user.admin,
	};

	const options = {
		expiresIn: '8h',
	};
	return jwt.sign(payload, jwtSecret, options);
}

/************************* END CREATE TOKEN *****************************/

module.exports = router;
