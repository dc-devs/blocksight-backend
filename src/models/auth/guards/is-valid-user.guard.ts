import { AuthService } from '../auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';
import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class IsValidUser implements CanActivate {
	constructor(private authService: AuthService) {}

	async canActivate(executionContext: ExecutionContext) {
		try {
			const ctx = GqlExecutionContext.create(executionContext);
			const context = ctx.getContext();
			const { req: request } = context;
			const { sessionInput } = ctx.getArgs();

			const user = await this.authService.validateUser(sessionInput);

			if (!user) {
				throw new UnauthorizedException();
			}

			request.user = user;

			return !!user;
		} catch (e) {
			throw new UnauthorizedException();
		}
	}
}
