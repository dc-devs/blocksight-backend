import { User } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { UsersService } from '../users/users.service';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrentUser } from '../graphql/decorators/current-user.decorator';

@Resolver('Auth')
export class AuthResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query('currentUser')
	@UseGuards(GqlAuthGuard)
	currentUser(@CurrentUser() user: Partial<User>): Promise<Partial<User>> {
		return this.usersService.findOne({ id: user.id });
	}
}
