// import * as passport from 'passport';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
// import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
// import { SessionConstants } from './auth/constants/session.constants';

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule, {
		logger: ['verbose'],
	});
	const port = process.env.PORT || 3001;

	app.enableCors();

	// app.use(
	// 	session({
	// 		resave: false,
	// 		saveUninitialized: false,
	// 		secret: SessionConstants.SECRET,
	// 		// cookie: { secure: true },
	// 	}),
	// );

	// app.use(passport.initialize());
	// app.use(passport.session());

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
