"use strict";
exports.__esModule = true;
exports.GraphqlModule = void 0;
var path_1 = require("path");
var config_1 = require("../server/config");
var graphql_1 = require("@nestjs/graphql");
var apollo_1 = require("@nestjs/apollo");
var environment_1 = require("../common/constants/environment");
var apollo_server_core_1 = require("apollo-server-core");
var plugins = environment_1.isDevelopmentEnv
    ? [(0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)()]
    : [];
var GraphqlModule = graphql_1.GraphQLModule.forRoot({
    plugins: plugins,
    debug: false,
    playground: false,
    cors: config_1.corsOptions,
    driver: apollo_1.ApolloDriver,
    context: function (_a) {
        var req = _a.req, res = _a.res;
        return ({ req: req, res: res });
    },
    autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
    formatError: function (error) {
        var graphQLFormattedError = {
            message: !error.message.includes('prisma')
                ? error.message
                : "Database Error" /* ErrorMessage.DATABASE_ERROR */,
            extensions: error.extensions
        };
        return graphQLFormattedError;
    }
});
exports.GraphqlModule = GraphqlModule;
