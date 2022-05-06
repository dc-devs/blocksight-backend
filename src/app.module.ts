import { AppService } from './app.service';
import GraphQLJSON from 'graphql-type-json';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import { UsersModule } from './users/users.module';
import { GusersModule } from './gusers/gusers.module';
import { PrismaService } from './prisma/prisma.service';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { TransfersModule } from './transfers/transfers.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PingController } from './ping/controller/ping.controller';
import { TransactionsModule } from './transactions/transactions.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TokenBalancesModule } from './token-balances/token-balances.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

const environment = process.env.NODE_ENV || 'development';
const isDevelopment = environment === 'development';

if (isDevelopment) {
	console.log('');
	console.log('[BlockSight] Environment:', environment);
	console.log('[Blocksight] Loading: ', ['.env', `.${environment}.env`]);
	console.log('');
}

const plugins =
	environment === 'development'
		? [ApolloServerPluginLandingPageLocalDefault()]
		: [];

@Module({
	imports: [
		UsersModule,
		TokenBalancesModule,
		TransfersModule,
		TransactionsModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: false,
			typePaths: ['./**/*.graphql'],
			resolvers: { DateTime: GraphQLDateTime, JSON: GraphQLJSON },
			plugins,
			debug: false,
			formatError: (error: GraphQLError) => {
				const graphQLFormattedError: GraphQLFormattedError = {
					message: error.message,
					extensions: error.extensions
				};

				return graphQLFormattedError;
			},
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env', `.env.${environment}`],
		}),
		GusersModule,
	],
	controllers: [PingController],
	providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
