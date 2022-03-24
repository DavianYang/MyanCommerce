import { ID } from '@myancommerce/nox-common';
import ApiError from '../../base.error';
import { ENTITY_NOT_FOUND_ERROR_CODE } from './entity-not-found.constant';

export class EntityNotFoundError extends ApiError {
    constructor(entityName: any, id: ID) {
        super(
            `Entity '${entityName}' with ID '${id}' not found.`,
            { entityName, id },
            ENTITY_NOT_FOUND_ERROR_CODE,
        );
    }
}
