const express = require('express');
const app = express();
const cors = require('cors')();
const { sign, verify } = require('jsonwebtoken');

const SECRET = '123';
const PORT = process.env.PORT || 4000;

const { fetch } = require('../pool');

app.use(express.json());

app.post('/signup', async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await fetch(
			`insert into users(username, password) values($1, $2)`,
			username,
			password
		);

		if (user) {
			const payload = {
				username,
				password,
			};

			const token = sign(payload, SECRET, { expiresIn: '600' });
			res.send(token);
		}
	} catch (e) {
		res.status(404).send(e.message);
	}
});

app.post('/login', async (req, res) => {
	const { u_name, pass } = req.body;

	const user = await fetch(
		`select username, password from users where username = $1 and password = $2`,
		u_name,
		pass
	);

	const username = user[0].username;
	const password = user[0].password;

	const payload = {
		username,
		password,
	};

	try {
		const token = sign(payload, SECRET, { expiresIn: '60s' });

		res.status(200).send({ token });
	} catch (e) {
		res.status(404).send('Hech narsa');
	}
});

app.get('/main', async (req, res) => {
	const { token } = req.headers;

	try {
		const { username, password } = verify(token, SECRET);

		const user = await fetch(
			`select username, password from users where username = $1 and password = $2`,
			username,
			password
		);
		res.status(200).send({ user });
	} catch (e) {
		res.status(404).send(e.message);
	}
});

app.listen(PORT, () => {
	console.log(`Server is on ${PORT}`);
});
