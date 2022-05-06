import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GusersService } from './gusers.service';
import { CreateUserInput } from './dto/create-guser.input';
import { UpdateGuserInput } from './dto/update-guser.input';
import { GetUsersInput } from './dto/get-gusers.input';
import { Guser } from '@prisma/client';

@Resolver('Guser')
export class GusersResolver {
	constructor(private readonly gusersService: GusersService) {}

	@Query('gusers')
	findAll(@Args() args: GetUsersInput): Promise<Partial<Guser>[]> {
		return this.gusersService.findAll(args);
	}

	@Query('guser')
	findOne(
		@Args('id', { type: () => Int })
		id: number
	) {
		return this.gusersService.findOne(id);
	}

	@Mutation('createGuser')
	create(@Args('createGuserInput') createGuserInput: CreateUserInput) {
		return this.gusersService.create(createGuserInput);
	}

	@Mutation('updateGuser')
	update(@Args('updateGuserInput') updateGuserInput: UpdateGuserInput) {
		return this.gusersService.update(updateGuserInput.id, updateGuserInput);
	}

	@Mutation('removeGuser')
	remove(@Args('id') id: number) {
		return this.gusersService.remove(id);
	}
}
