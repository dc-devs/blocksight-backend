import GraphQLJSON from 'graphql-type-json';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import ErrorMessage from './error-message.enum';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

const environment = process.env.NODE_ENV || 'development';
const isDevelopment = environment === 'development';

const plugins = isDevelopment
	? [ApolloServerPluginLandingPageLocalDefault()]
	: [];

const GraphqlModule = GraphQLModule.forRoot<ApolloDriverConfig>({
	driver: ApolloDriver,
	playground: false,
	typePaths: ['./**/*.graphql'],
	resolvers: { DateTime: GraphQLDateTime, JSON: GraphQLJSON },
	plugins,
	debug: false,
	formatError: (error: GraphQLError) => {
		const graphQLFormattedError: GraphQLFormattedError = {
			message: !error.message.includes('prisma')
				? error.message
				: ErrorMessage.DATABASE_ERROR,
			extensions: error.extensions,
		};

		return graphQLFormattedError;
	},
});

export { GraphqlModule };