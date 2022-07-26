import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersExchangesService } from './users-exchanges.service';
import { UsersExchangesResolver } from './users-exchanges.resolver';

@Module({
	providers: [UsersExchangesResolver, UsersExchangesService, PrismaService],
	exports: [UsersExchangesService],
})
export class UsersExchangesModule {}
