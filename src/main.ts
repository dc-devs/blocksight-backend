import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SessionConstants } from './auth/constants/session.constants';

const bootstrap = async () => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: ['verbose'],
	});
	const port = process.env.PORT || 3001;

	app.enableCors({
		credentials: true,
		origin: [
			'http://localhost:3000',
			'http://localhost:4000/graphql',
			'https://studio.apollographql.com',
		],
	});

	const oneHour = 1000 * 60 * 60;
	const oneDay = oneHour * 24;
	const sixtyDays = oneDay * 60;

	const sessionConfig: session.SessionOptions = {
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

	// TODO, ensure that this is actually getting the NODE_ENV
	app.set('trust proxy', true); // process.env.NODE_ENV !== 'production
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
