import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TokenBalancesModule } from './token-balances/token-balances.module';
import { TransfersModule } from './transfers/transfers.module';
import { TransactionsModule } from './transactions/transactions.module';
import { PingController } from './ping/controller/ping.controller';

const environment = process.env.NODE_ENV || 'development';

console.log('');
console.log('[BlockSight] Environment:', environment);
console.log('[Blocksight] Loading: ', ['.env', `.${environment}.env`]);
console.log('');

@Module({
	imports: [
		UsersModule,
		TokenBalancesModule,
		TransfersModule,
		TransactionsModule,
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env', `.${environment}.env`],
		}),
	],
	controllers: [PingController],
	providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
