import Cookie from '../enums/cookie.enum';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { initializeRedis } from './initialize-redis';
import { SessionConstants } from '../../models/auth/constants/session.constants';

const initializeSession = async () => {
	const redisClient = await initializeRedis();

	const RedisStore = connectRedis(session);

	const oneHour = 1000 * 60 * 60;
	const oneDay = oneHour * 24;
	const sixtyDays = oneDay * 60;

	const sessionConfig: session.SessionOptions = {
		store: new RedisStore({ client: redisClient }),
		name: Cookie.NAME,
		resave: false,
		saveUninitialized: false,
		secret: SessionConstants.SECRET,
		cookie: {
			httpOnly: true,
			secure: true,
			maxAge: sixtyDays,
			sameSite: 'none',
		},
	};

	return session(sessionConfig);
};

export default initializeSession;
