import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum SocialProviderTypes {
    FACEBOOK = 'facebook',
    GOOGLE = 'google',
}

registerEnumType(SocialProviderTypes, {
    name: 'SocialAuthProviders',
});

@InputType()
export class SignUpInput {
    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class LoginSocialInput {
    @Field()
    accessToken: string;

    @Field(() => SocialProviderTypes)
    provider: SocialProviderTypes;
}
