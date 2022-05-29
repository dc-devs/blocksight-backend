import App from '../../../src/common/enums/app';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { initializeSession } from '../../../src/server/initialize';
import logInitMessage from '../../../src/server/utils/log-init-message';
import { validationPipe, corsOptions } from '../../../src/server/config';
import { isProductionEnv } from '../../../src/common/constants/environment';

const initializeTestApp = async () => {
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

	logInitMessage();

	return app;
};

export default initializeTestApp;
