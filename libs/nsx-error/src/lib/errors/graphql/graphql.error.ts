import { Field, ObjectType } from '@nestjs/graphql';
import { ErrorResult } from '../../base.graphql.error';
import {
    EMAIL_ADDRESS_CONFLICT_ERROR_CODE,
    INVALID_CREDIENTIAL_ERROR_CODE,
    INVALID_CREDIENTIAL_ERROR_MESSAGE,
    MISSING_PASSWORD_ERROR_CODE,
    MISSING_PASSWORD_ERROR_MESSAGE,
    NOT_VERIFIED_ERROR_CODE,
    NOT_VERIFIED_ERROR_MESSAGE,
    PASSWORD_ALREADY_SET_ERROR_CODE,
    PASSWORD_ALREADY_SET_ERROR_MESSAGE,
    PASSWORD_VALIDATION_ERROR_CODE,
    PASSWORD_VALIDATION_ERROR_MESSAGE,
    VERIFICATION_TOKEN_EXPIRED_ERROR_CODE,
    VERIFICATION_TOKEN_EXPIRED_ERROR_MESSAGE,
    VERIFICATION_TOKEN_INVALID_ERROR_CODE,
    VERIFICATION_TOKEN_INVALID_ERROR_MESSAGE,
} from './graphql.error.constant';

@ObjectType({
    description:
        'Returned when attempting to create a Customer with an email address already registered to an existing User.',
})
export class EmailAddressConflictError extends ErrorResult {
    @Field(() => String)
    email: String;

    constructor(partial?: Partial<EmailAddressConflictError>) {
        super(
            EMAIL_ADDRESS_CONFLICT_ERROR_CODE,
            `User with this ${partial?.email || 'email'} already exist.`,
        );
        Object.assign(this, partial);
    }
}

@ObjectType({
    description:
        'Returned if the user authentication credentials are not valid.',
})
export class InvalidCredentialsError extends ErrorResult {
    @Field()
    authenticationError: String;

    constructor(partial?: Partial<InvalidCredentialsError>) {
        super(
            INVALID_CREDIENTIAL_ERROR_CODE,
            INVALID_CREDIENTIAL_ERROR_MESSAGE,
        );
        Object.assign(this, partial);
    }
}

@ObjectType({
    description:
        'Returned when attempting to register or verify a customer account without a password, when one is required.',
})
export class MissingPasswordError extends ErrorResult {
    constructor(partial?: Partial<MissingPasswordError>) {
        super(MISSING_PASSWORD_ERROR_CODE, MISSING_PASSWORD_ERROR_MESSAGE);
        Object.assign(this, partial);
    }
}

@ObjectType({
    description:
        'Returned when attempting to verify a customer account with a password, when a password has already been set.',
})
export class PasswordAlreadySetError extends ErrorResult {
    constructor(partial?: Partial<PasswordAlreadySetError>) {
        super(
            PASSWORD_ALREADY_SET_ERROR_CODE,
            PASSWORD_ALREADY_SET_ERROR_MESSAGE,
        );
        Object.assign(this, partial);
    }
}

@ObjectType({
    description:
        'Returned when attempting to register or verify a customer account where the given password fails password validation.',
})
export class PasswordValidationError extends ErrorResult {
    constructor(partial?: Partial<PasswordValidationError>) {
        super(
            PASSWORD_VALIDATION_ERROR_CODE,
            PASSWORD_VALIDATION_ERROR_MESSAGE,
        );
        Object.assign(this, partial);
    }
}

@ObjectType({
    description:
        "Returned if the verification token (used to verify a Customer's email address) is valid, but has expired according to the verificationTokenDuration setting in the AuthOptions.",
})
export class VerificationTokenExpired extends ErrorResult {
    constructor(partial?: Partial<VerificationTokenExpired>) {
        super(
            VERIFICATION_TOKEN_EXPIRED_ERROR_CODE,
            VERIFICATION_TOKEN_EXPIRED_ERROR_MESSAGE,
        );
        Object.assign(this, partial);
    }
}

@ObjectType({
    description:
        "Returned if the verification token (used to verify a Customer's email address) is either invalid or does not match any expected tokens.",
})
export class VerificationTokenInvalidError extends ErrorResult {
    constructor(partial?: Partial<VerificationTokenInvalidError>) {
        super(
            VERIFICATION_TOKEN_INVALID_ERROR_CODE,
            VERIFICATION_TOKEN_INVALID_ERROR_MESSAGE,
        );
        Object.assign(this, partial);
    }
}

@ObjectType({
    description:
        'Returned if authConfig.requireVerification is set to true (which is the default)and an unverified user attempts to authenticate',
})
export class NotVerifiedError extends ErrorResult {
    constructor(partial?: Partial<NotVerifiedError>) {
        super(NOT_VERIFIED_ERROR_CODE, NOT_VERIFIED_ERROR_MESSAGE);
        Object.assign(this, partial);
    }
}
