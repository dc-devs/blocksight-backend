import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule);
	const port = process.env.PORT || 3001;

	app.enableCors();

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // blocking DTO
			transform: true,
			forbidNonWhitelisted: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		})
	);

	await app.listen(port);
};

bootstrap();
