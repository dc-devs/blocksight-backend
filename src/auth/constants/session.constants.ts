require('dotenv').config();

const SessionConstants = {
	SECRET: process.env.SESSION_SECRET,
};

export { SessionConstants };
