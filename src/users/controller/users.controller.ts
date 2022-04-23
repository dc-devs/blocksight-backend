import {
	Get,
	Put,
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
	findAll(@Query() query: GetUsersInput) {
		return this.usersService.findAll(query);
	}

	@Get(':id')
	findOne(
		@Param('id', ParseIntPipe) id: number
	): string | Promise<User | null> {
		console.log(`findOne: ${id}`);
		return `findOne: ${id}`;

		// const user = this.usersService.findOne(id);

		// if(!user) {
		// 	throw new NotFoundException(`User #${id} not found.`);
		// }

		// return
	}

	@Post()
	create(@Body() user: CreateUserInput): Promise<User> {
		return this.usersService.create(user);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserInput) {
		console.log(`update: ${id}:${updateUserDto}`);
		return `update: ${id}:${updateUserDto}`;
		// return this.usersService.update(+id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		console.log(`delete: ${id}`);
		return `delete: ${id}`;
		// return this.usersService.remove(+id);
	}
}
