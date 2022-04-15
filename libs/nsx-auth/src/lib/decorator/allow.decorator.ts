import { SetMetadata } from '@nestjs/common';
import { Permission, PERMISSIONS_METADATA_KEY } from '../enum/permission.enum';

export const Allow = (...permissions: Permission[]) =>
    SetMetadata(PERMISSIONS_METADATA_KEY, permissions);
