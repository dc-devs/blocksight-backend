import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FiatTransfersService } from './fiat-transfers.service';
import { FiatTransfersResolver } from './fiat-transfers.resolver';

@Module({
	providers: [FiatTransfersResolver, FiatTransfersService, PrismaService],
	exports: [FiatTransfersService],
})
export class FiatTransfersModule {}
