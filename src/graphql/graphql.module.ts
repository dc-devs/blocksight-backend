import { join } from 'path';
import { corsOptions } from '../server/config';
import { GraphQLModule } from '@nestjs/graphql';
import ErrorMessage from './errors/error-message.enum';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { isDevelopmentEnv } from '../common/constants/environment';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

const plugins = isDevelopmentEnv
	? [ApolloServerPluginLandingPageLocalDefault()]
	: [];

const GraphqlModule = GraphQLModule.forRoot<ApolloDriverConfig>({
	plugins,
	debug: false,
	playground: false,
	cors: corsOptions,
	driver: ApolloDriver,
	autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
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
