import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
	providers: [UsersResolver, UsersService, PrismaService],
	exports: [UsersService],
})
export class UsersModule {}
