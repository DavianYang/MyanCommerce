import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export class ErrorResult {
    @Field()
    errorCode: String;

    @Field()
    message: String;

    constructor(errorCode?: string, message?: string) {
        if (errorCode && message) {
            this.errorCode = errorCode || '';
            this.message = message || '';
        }
    }
}
