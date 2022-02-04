import { INestApplication } from '@nestjs/common';
import { RequestContext, RoleService } from '@myancommerce/core';
import { isGraphqlErrorResult } from '@myancommerce/nox-common';
import { initialData } from '../data/e2e-initial-data';

export async function populateRoles(app: INestApplication) {
    const roleService = app.get(RoleService);
    const roleData = initialData.roles;
    const ctx = new RequestContext({
        apiType: 'admin',
        authorizedAsOwnerOnly: true,
        isAuthorized: true,
    });
    for (const role of roleData) {
        try {
            const createdRole = await roleService.create(ctx, role);
            if (isGraphqlErrorResult(createdRole)) {
                continue;
            }
        } catch (e) {
            console.log(e);
        }
    }
}
