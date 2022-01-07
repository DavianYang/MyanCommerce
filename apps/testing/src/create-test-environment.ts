import { MyanCommerceConfig } from '@myancommerce/core';
import { TestGraphQLClient } from './test-graphql-clients';
import { TestServer } from './test-server';

export function createTestEnvironment(config: Required<MyanCommerceConfig>) {
    const server = new TestServer(config);
    const { port, adminApiPath, shopApiPath } = config.apiOptions;

    const adminClient = new TestGraphQLClient(
        `https://localhost:${port}/${adminApiPath}}`,
    );
    const shopClient = new TestGraphQLClient(
        `https://localhost:${port}/${shopApiPath}`,
    );

    return {
        server,
        adminClient,
        shopClient,
    };
}
