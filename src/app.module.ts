import Logger from './utils/logger';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { GraphqlModule } from './graphql/graphql.module';
import { TransfersModule } from './transfers/transfers.module';
import { TransactionsModule } from './transactions/transactions.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TokenBalancesModule } from './token-balances/token-balances.module';

const environment = process.env.NODE_ENV || 'development';
const isDevelopment = environment === 'development';

if (isDevelopment) {
	Logger.debug('Environment:', environment);
	Logger.debug('Loading:', ['.env', `.${environment}.env`]);
}

@Module({
	imports: [
		UsersModule,
		GraphqlModule,
		TransfersModule,
		TransactionsModule,
		TokenBalancesModule,
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env', `.env.${environment}`],
		}),
		AuthModule,
	],
	providers: [PrismaService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
