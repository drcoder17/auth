const { Pool } = require('pg');

const pool = new Pool({
	database: 'auth',
	host: 'localhost',
	user: 'postgres',
	password: 78952,
	port: 5432,
});

const fetch = async (SQL, ...params) => {
	const client = await pool.connect();

	try {
		const { rows } = await client.query(SQL, params.length ? params : null);
		return rows;
	} finally {
		client.release();
	}
};

module.exports = {
	fetch,
};
