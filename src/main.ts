import * as passport from 'passport';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { SessionConstants } from './auth/constants/session.constants';

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule, {
		logger: ['verbose'],
	});
	const port = process.env.PORT || 3001;

	app.enableCors();

	const environment = process.env.NODE_ENV || 'development';
	const isDevelopment = environment === 'development';
	const oneHour = 1000 * 60 * 60;
	const oneDay = oneHour * 24;
	const sixtyDays = oneDay * 60;

	const sessionConfig = {
		resave: false,
		saveUninitialized: false,
		secret: SessionConstants.SECRET,
		cookie: {
			secure: true,
			maxAge: sixtyDays,
		},
	};

	if (isDevelopment) {
		sessionConfig.cookie.secure = false;
	}

	app.use(session(sessionConfig));

	app.use(passport.initialize());
	app.use(passport.session());

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // blocking DTO
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
