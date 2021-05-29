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
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { User, Prisma } from '@prisma/client';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() data: Prisma.UserCreateInput) {
		return this.usersService.create(data);
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
		return this.usersService.findOne(id);
	}

	@Get()
	findAll(@Query() query) {
		return this.usersService.findAll(query);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return 'update user';
		// return this.usersService.update(+id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(+id);
	}
}
