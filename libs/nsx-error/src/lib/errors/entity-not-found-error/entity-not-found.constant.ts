import { ID } from '@myancommerce/nox-common';
import ApiError from '../../base.error';
import {
    ENTITY_NOT_FOUND_ERROR_CODE,
    ENTITY_NOT_FOUND_ERROR_MESSAGE,
} from './entity-not-found.error';

export class EntityNotFoundError extends ApiError {
    constructor(entityName: any, id: ID) {
        super(
            ENTITY_NOT_FOUND_ERROR_CODE,
            { entityName, id },
            ENTITY_NOT_FOUND_ERROR_MESSAGE,
        );
    }
}
