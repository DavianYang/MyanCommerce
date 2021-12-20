import { GraphQLModule } from '@nestjs/graphql';
import { ConfigService } from 'config/config.service';

export interface GraphQLApiOptions {
    apiType: 'shop' | 'admin';
    typePaths: string[];
    debug: boolean;
    playground: boolean | any;
}

/**
 * Dynamically generates a GraphQLModule according to the given config options.
 */
export function configureGraphQLModule(
    getOptions: (configService: ConfigService) => GraphQLApiOptions,
) {
    return GraphQLModule.forRootAsync({
        useFactory: (configService: ConfigService) => {
            return {};
        },
    });
}
