import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
	controllers: [UsersController],
	providers: [UsersService, PrismaService],
})
export class UsersModule {}
