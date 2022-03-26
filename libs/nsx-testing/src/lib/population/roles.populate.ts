import { RoleService } from '@myancommerce/nsx-role';
import { INestApplication } from '@nestjs/common';
import { initialData } from '../data/e2e-initial-data';

export async function populateRoles(app: INestApplication) {
    const roleService = app.get(RoleService);
    const roleData = initialData.roles;

    for (const role of roleData) {
        try {
            await roleService.createRole({ data: role });
        } catch (e) {
            console.log(e);
        }
    }
}
