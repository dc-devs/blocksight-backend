import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TokenBalancesService } from './token-balances.service';
import { TokenBalancesResolver } from './token-balances.resolver';

@Module({
	providers: [TokenBalancesResolver, TokenBalancesService, PrismaService],
	exports: [TokenBalancesService],
})
export class TokenBalancesModule {}
