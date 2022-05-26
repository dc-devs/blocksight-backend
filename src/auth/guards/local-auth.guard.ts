import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard {
	// getRequest(context: ExecutionContext) {
	// 	const ctx = GqlExecutionContext.create(context);
	// 	const request = ctx.getContext();

	// 	request.body = ctx.getArgs().sessionInput;

	// 	console.log('');
	// 	console.log(
	// 		'[LocalAuthGuard::getRequest] Adding GraphQL context args to request body..',
	// 	);
	// 	console.log(request.body);
	// 	console.log('');

	// 	return request;
	// }
	async canActivate(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		const request = ctx.getContext().req;

		request.body = ctx.getArgs().sessionInput;

		const result = true; //(await super.canActivate(ctx)) as boolean;
		console.log('');
		console.log('[LocalAuthGuard::canActivate]');
		console.log(result);
		console.log('');

		console.log('');
		console.log('[LocalAuthGuard::logIn]');
		console.log('');

		return result;
	}
}
