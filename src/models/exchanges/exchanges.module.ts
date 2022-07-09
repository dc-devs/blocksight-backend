import { Module } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';
import { ExchangesResolver } from './exchanges.resolver';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
	providers: [ExchangesResolver, ExchangesService, PrismaService],
	exports: [ExchangesService],
})
export class ExchangesModule {}
