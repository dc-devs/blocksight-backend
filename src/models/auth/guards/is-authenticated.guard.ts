import { GqlExecutionContext } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class IsAuthenticated implements CanActivate {
	constructor(private usersService: UsersService) {}

	async canActivate(context: ExecutionContext) {
		try {
			const ctx = GqlExecutionContext.create(context);
			const request = ctx.getContext().req;
			// console.log(request);

			const id = request.session.userId;

			// console.log('');
			// console.log('USER ID', id);
			// console.log('');

			const user = await this.usersService.findOne({ id });

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
