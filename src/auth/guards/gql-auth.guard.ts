import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		const request = ctx.getContext();

		request.body = ctx.getArgs().loginInput;

		return request;
	}
}
