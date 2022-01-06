import ApiError from './base.error';

export class InternalServerError extends ApiError {
    constructor(
        message: string,
        variables: { [key: string]: string | number } = {},
    ) {
        super(message, variables, 'INTERNAL_SERVER_ERROR');
    }
}
