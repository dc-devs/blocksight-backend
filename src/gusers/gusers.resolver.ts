import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GusersService } from './gusers.service';
import { CreateGuserInput } from './dto/create-guser.input';
import { UpdateGuserInput } from './dto/update-guser.input';
import { GetUsersInput } from './dto/get-gusers.input';
import { Guser, Prisma } from '@prisma/client';

@Resolver('Guser')
export class GusersResolver {
	constructor(private readonly gusersService: GusersService) {}

	@Mutation('createGuser')
	create(@Args('createGuserInput') createGuserInput: CreateGuserInput) {
		return this.gusersService.create(createGuserInput);
	}

	@Query('gusers')
	findAll(): Promise<Partial<Guser>[]> {
		return this.gusersService.findAll({});
	}

	@Query('guser')
	findOne(@Args('id') id: number) {
		return this.gusersService.findOne(id);
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
