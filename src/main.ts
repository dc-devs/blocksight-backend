import App from './common/enums/app';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import port from './common/constants/port';
import { initializeSession } from './server/initialize';
import logInitMessage from './server/utils/log-init-message';
import { validationPipe, corsOptions } from './server/config';
import { isProductionEnv } from './common/constants/environment';
import { NestExpressApplication } from '@nestjs/platform-express';

const bootstrap = async () => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: ['verbose'],
	});

	const session = await initializeSession();

	app.use(session);

	app.enableCors(corsOptions);

	app.set(App.TRUST_PROXY, !isProductionEnv);

	app.useGlobalPipes(validationPipe);

	await app.listen(port);

	logInitMessage();
};

bootstrap();
