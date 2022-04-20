import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const { originalUrl } = req;
		const { statusCode } = res;

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
