import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
// AuthGuard('jwt') uses the setup in the JWT module to confirm jwt token
export class JwtAuthGuard extends AuthGuard('jwt') {
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req;
	}
}
