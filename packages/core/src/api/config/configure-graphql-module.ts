import path from 'path';
import {
    GqlModuleOptions,
    GraphQLModule,
    GraphQLTypesLoader,
} from '@nestjs/graphql';
import { GraphQLSchema, buildSchema, printSchema } from 'graphql';
import { ConfigModule } from '../../config/config.module';
import { ServiceModule } from '../../service/service.module';
import { ConfigService } from '../../config/config.service';

export interface GraphQLApiOptions {
    apiType: 'shop' | 'admin';
    typePaths: string[];
    apiPath: string;
    debug: boolean;
    playground: boolean | any;
    resolverModule: Function;
}

/**
 * Dynamically generates a GraphQLModule according to the given config options.
 */
export function configureGraphQLModule(
    getOptions: (configService: ConfigService) => GraphQLApiOptions,
) {
    return GraphQLModule.forRootAsync({
        useFactory: (
            configService: ConfigService,
            typesLoader: GraphQLTypesLoader,
        ) => {
            return createGraphQLOptions(typesLoader, getOptions(configService));
        },
        inject: [ConfigService, GraphQLTypesLoader],
        imports: [ConfigModule, ServiceModule],
    });
}

async function createGraphQLOptions(
    typesLoader: GraphQLTypesLoader,
    options: GraphQLApiOptions,
): Promise<GqlModuleOptions> {
    const builtSchema = await buildSchemaForAPI();

    return {
        path: '/' + options.apiPath,
        typeDefs: printSchema(builtSchema),
        include: [options.resolverModule],
        playground: options.playground || false,
        debug: options.debug || false,
        context: (req: any) => req,
        cors: false,
    } as GqlModuleOptions;

    /**
     * Generates the server's GraphQL schema by combining:
     * 1. the default schema as defined in the source .graphql files specified by `typePaths`
     * 2. any custom fields defined in the config
     * 3. any schema extensions defined by plugins
     */
    async function buildSchemaForAPI(): Promise<GraphQLSchema> {
        // Paths must be normalized to use forward-slash separators.
        // See https://github.com/nestjs/graphql/issues/336
        const normalizedPaths = options.typePaths.map(p =>
            p.split(path.sep).join('/'),
        );
        const typeDefs = await typesLoader.mergeTypesByPaths(normalizedPaths);
        const schema = buildSchema(typeDefs);

        return schema;
    }
}
