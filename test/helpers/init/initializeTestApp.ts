import App from '../../../src/common/enums/app';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { initializeSession } from '../../../src/server/initialize';
import { validationPipe, corsOptions } from '../../../src/server/config';
import { isProductionEnv } from '../../../src/common/constants/environment';

let testApp: INestApplication;

const initializeTestApp = async (): Promise<INestApplication> => {
	let app: INestApplication;

	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	}).compile();

	app = moduleFixture.createNestApplication();

	app.useLogger([]);

	const session = await initializeSession();

	app.use(session);

	app.enableCors(corsOptions);

	app.useGlobalPipes(validationPipe);

	const httpAdapter = app.getHttpAdapter();
	const instance = httpAdapter.getInstance();
	instance.set(App.TRUST_PROXY, !isProductionEnv);

	await app.init();

	testApp = app;

	return app;
};

export { testApp, initializeTestApp };
