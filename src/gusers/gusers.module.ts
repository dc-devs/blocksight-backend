import { Module } from '@nestjs/common';
import { GusersService } from './gusers.service';
import { GusersResolver } from './gusers.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
	providers: [GusersResolver, GusersService, PrismaService],
})
export class GusersModule {}
