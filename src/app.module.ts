import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { GusersModule } from './gusers/gusers.module';
import { GraphqlModule } from './graphql/graphql.module';
import { PrismaService } from './prisma/prisma.service';
import { TransfersModule } from './transfers/transfers.module';
import { PingController } from './ping/controller/ping.controller';
import { TransactionsModule } from './transactions/transactions.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TokenBalancesModule } from './token-balances/token-balances.module';

const environment = process.env.NODE_ENV || 'development';
const isDevelopment = environment === 'development';

if (isDevelopment) {
	console.log('');
	console.log('[BlockSight] Environment:', environment);
	console.log('[Blocksight] Loading: ', ['.env', `.${environment}.env`]);
	console.log('');
}

@Module({
	imports: [
		UsersModule,
		GusersModule,
		GraphqlModule,
		TransfersModule,
		TransactionsModule,
		TokenBalancesModule,
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env', `.env.${environment}`],
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
