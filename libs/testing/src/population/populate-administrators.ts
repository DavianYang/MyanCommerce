import {
    RequestContext,
    isGraphqlErrorResult,
    AdministratorService,
} from '@myancommerce/core';
import { INestApplication } from '@nestjs/common';
import { MockDataService } from './mock-data.service';

export async function populateAdministrators(
    app: INestApplication,
    count: number,
) {
    const administratorService = app.get(AdministratorService);
    const administratorData = MockDataService.getAdministrators(count);
    const ctx = new RequestContext({
        apiType: 'admin',
        authorizedAsOwnerOnly: true,
        isAuthorized: true,
    });
    for (const { administrator } of administratorData) {
        try {
            const createdAdministrator = await administratorService.create(
                ctx,
                administrator,
            );

            if (isGraphqlErrorResult(createdAdministrator)) {
                continue;
            }
        } catch (e) {
            console.log(e);
        }
    }
}
