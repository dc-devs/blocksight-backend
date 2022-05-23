import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		const request = ctx.getContext();

		request.body = ctx.getArgs().sessionInput;

		console.log('');
		console.log(
			'[LocalAuthGuard::getRequest] Adding GraphQL context args to request body..',
		);
		console.log(request.body);
		console.log('');

		return request;
	}
}
