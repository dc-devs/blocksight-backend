import * as session from 'express-session';
import { AppModule } from '../../../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SessionConstants } from '../../../src/models/auth/constants/session.constants';

const initializeTestApp = async () => {
	let app: INestApplication;

	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	}).compile();

	app = moduleFixture.createNestApplication();

	app.enableCors();

	app.useLogger([]);

	app.use(
		session({
			resave: false,
			saveUninitialized: false,
			secret: SessionConstants.SECRET,
		}),
	);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		})
	);

	await app.init();

	return app;
};

export default initializeTestApp;
