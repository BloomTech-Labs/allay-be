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
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 3); //Change in production!!!

	user.password = hash;
	User.addUser(user)
		.then((newUser) => {
			const token = signToken(newUser);
			const { username, id } = newUser;
			res.status(201).json({ username, token, id });
		})
		.catch((err) => {
			res.status(500).json({ error: 'There was an error signing up.', err });
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
				const { id, username } = user;

				res.status(200).json({ username, token, id });
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
	};

	const options = {
		expiresIn: '8h',
	};
	return jwt.sign(payload, jwtSecret, options);
}

/************************* END CREATE TOKEN *****************************/

module.exports = router;
