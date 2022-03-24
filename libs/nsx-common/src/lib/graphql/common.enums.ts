import { registerEnumType } from '@nestjs/graphql';

export enum DeletionResult {
    DELETED,
    NOT_DELETED,
}

registerEnumType(DeletionResult, {
    name: 'DeletionResult',
    valuesMap: {
        DELETED: {
            description: 'The entity was successfully deleted',
        },
        NOT_DELETED: {
            description: 'Deletion did not take place, reason given in message',
        },
    },
});
