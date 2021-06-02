import { Module } from '@nestjs/common';
import { TokenBalancesService } from './token-balances.service';
import { TokenBalancesController } from './token-balances.controller';

@Module({
	controllers: [TokenBalancesController],
	providers: [TokenBalancesService],
})
export class TokenBalancesModule {}
