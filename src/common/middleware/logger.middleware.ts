import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const { statusCode, originalUrl } = req;

		console.log(
			`\n`,
			{
				statusCode,
				originalUrl,
			},
			`\n`
		);

		next();
	}
}
