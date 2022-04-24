import {
	Get,
	Patch,
	Post,
	Body,
	Param,
	Query,
	Delete,
	Controller,
	ParseIntPipe,
	NotFoundException,
} from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { UsersService } from '../service/users.service';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { GetUsersInput } from '../dto/get-users.input';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	findAll(@Query() query: GetUsersInput): Promise<Partial<User>[]> {
		return this.usersService.findAll(query);
	}

	@Get(':id')
	async findOne(
		@Param('id', ParseIntPipe) id: number
	): Promise<Partial<User>> {
		const user = await this.usersService.findOne(id);

		if (!user) {
			throw new NotFoundException(`User #${id} not found.`);
		}

		return user;
	}

	@Post()
	create(@Body() user: CreateUserInput): Promise<Partial<User>> {
		return this.usersService.create(user);
	}

	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateUserInput: Prisma.UserUpdateInput
	) {
		return this.usersService.update(id, updateUserInput);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		console.log(`delete: ${id}`);
		return `delete: ${id}`;
		// return this.usersService.remove(+id);
	}
}
