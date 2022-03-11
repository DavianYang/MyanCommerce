// import { join } from 'path';
// import { PrismaClient } from '@prisma/client';
// import { ServerInfo } from 'apollo-server';
// import { execSync } from 'child_process';
// import getPort, { makeRange } from 'get-port';
// import { GraphQLClient } from 'graphql-request';

// type TestContext = {
//     prisma: PrismaClient;
//     client: GraphQLClient;
// };

// export function createTestContext(): TestContext {
//     let ctx = {} as TestContext;

//     const graphqlCtx = graphqlTestContext();

//     const prismaCtx = prismaTestContext();

//     beforeEach(async () => {
//         const client = await graphqlCtx.before();

//         const db = await prismaCtx.before();

//         Object.assign(ctx, {
//             client,

//             db,
//         });
//     });

//     afterEach(async () => {
//         await graphqlCtx.after();

//         await prismaCtx.after();
//     });

//     return ctx;
// }

// function graphqlTestContext() {
//     let serverInstance: ServerInfo | null = null;

//     return {
//         async before() {
//             const port = await getPort({ port: makeRange(4000, 6000) });

//             serverInstance = await server.listen({ port });

//             // Close the Prisma Client connection when the Apollo Server is closed

//             serverInstance.server.on('close', async () => {
//                 db.$disconnect();
//             });

//             return new GraphQLClient(`http://localhost:${port}`);
//         },

//         async after() {
//             serverInstance?.server.close();
//         },
//     };
// }
