// import { createClient } from 'redis';
// import * as connectRedis from 'connect-redis';
import Logger from './utils/logger';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import Environment from './common/enums/environment.enum';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SessionConstants } from './auth/constants/session.constants';

const bootstrap = async () => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: ['verbose'],
	});

	const port = process.env.PORT || 3001;

	app.enableCors({
		credentials: true,
		origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
	});

	//Configure redis client
	// const RedisStore = connectRedis(session);

	Logger.debug('Port:', port);
	Logger.debug('Redis:', process.env.REDIS_URL);

	// const redisClient = createClient({
	// 	url: process.env.REDIS_URL,
	// });

	// redisClient.on('error', (error) => {
	// 	console.log(`Could not establish a connection with redis. ${error}`);
	// });

	// redisClient.on('connect', () => {
	// 	console.log('Connected to redis successfully');
	// });

	const oneHour = 1000 * 60 * 60;
	const oneDay = oneHour * 24;
	const sixtyDays = oneDay * 60;

	const sessionConfig: session.SessionOptions = {
		// store: new RedisStore({ client: redisClient }),
		name: '_bb_session',
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

	app.set('trust proxy', process.env.NODE_ENV !== Environment.PRODUCTION);
	app.use(session(sessionConfig));

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);

	await app.listen(port);
};

bootstrap();
