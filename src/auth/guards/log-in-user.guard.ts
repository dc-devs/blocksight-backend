import { AuthService } from '../auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';
import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class LogInUser implements CanActivate {
	constructor(private authService: AuthService) {}

	async canActivate(executionContext: ExecutionContext) {
		try {
			const ctx = GqlExecutionContext.create(executionContext);
			const context = ctx.getContext();
			const { req: request } = context;

			const user = await this.authService.login(request);

			if (!user) {
				throw new UnauthorizedException();
			}

			return !!user;
		} catch (e) {
			throw new UnauthorizedException();
		}
	}
}
