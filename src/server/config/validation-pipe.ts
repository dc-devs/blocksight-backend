import { ValidationPipe } from '@nestjs/common';

export default new ValidationPipe({
	whitelist: true,
	transform: true,
	forbidNonWhitelisted: true,
	transformOptions: {
		enableImplicitConversion: true,
	},
});
