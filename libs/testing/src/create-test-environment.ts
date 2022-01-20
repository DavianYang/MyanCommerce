import { MyanCommerceConfig } from '@myancommerce/core';
import { TestGraphQLClient } from './test-graphql-clients';
import { TestServer } from './test-server';

export function createTestEnvironment(config: Required<MyanCommerceConfig>) {
    const server = new TestServer(config);

    const { port, adminApiPath } = config.apiOptions;

    const adminClient = new TestGraphQLClient(
        `http://localhost:${port}/${adminApiPath}/}`,
    );

    return {
        server,
        adminClient,
    };
}
