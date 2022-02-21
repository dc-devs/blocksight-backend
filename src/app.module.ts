import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TokenBalancesModule } from './token-balances/token-balances.module';
import { TransfersModule } from './transfers/transfers.module';
import { TransactionsModule } from './transactions/transactions.module';
import { PingController } from './ping/ping.controller';

@Module({
	imports: [
		UsersModule,
		TokenBalancesModule,
		TransfersModule,
		TransactionsModule,
	],
	controllers: [PingController],
	providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
