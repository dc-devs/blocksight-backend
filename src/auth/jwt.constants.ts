require('dotenv').config();

const JwtConstants = {
	SECRET: process.env.JWT_SECRET,
};

export { JwtConstants };
