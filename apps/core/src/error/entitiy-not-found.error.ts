import { ID } from '@myancommerce/nox-common';

import { coreEntitiesMap } from '../entity/entities';
import ApiError from './base.error';

export class EntityNotFoundError extends ApiError {
    constructor(entityName: keyof typeof coreEntitiesMap, id: ID) {
        super(
            'error.entity-with-id-not-found',
            { entityName, id },
            'ENTITY_NOT_FOUND',
        );
    }
}
