import { Request as HttpRequest, Response as HttpResponse } from 'express';
import { GraphQLResolveInfo } from 'graphql';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { TokenMethod } from '@myancommerce/nox-common';
import { ConfigService } from '@myancommerce/nsx-config';
import {
    extractSessionToken,
    SessionService,
    setSessionToken,
} from '@myancommerce/nsx-session';

import { Permission, PERMISSIONS_METADATA_KEY } from '../enum/permission.enum';
import { parseContext } from '../utils/parse-context';
import { CachedSession } from '@myancommerce/nsx-cache';

@Injectable()
export class AuthGuard implements CanActivate {
    strategy: any;

    constructor(
        private sessionService: SessionService,
        private configService: ConfigService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { req, res, info } = parseContext(context);

        const isFieldResolver = this.isFieldResolver(info);

        const permissions = this.reflector.get<Permission[]>(
            PERMISSIONS_METADATA_KEY,
            context.getHandler(),
        );

        if (isFieldResolver && !permissions) {
            return true;
        }

        const isPublic =
            !!permissions && permissions.includes(Permission.Public);

        // const hasOwnPermission =
        //     !!permissions && permissions.includes(Permission.Owner);

        if (!permissions || isPublic) {
            return true;
        } else {
            return false;
        }
    }

    private async getSession(
        req: HttpRequest,
        res: HttpResponse,
        hasOwnerPermission: boolean,
    ) {
        let serializedSession: CachedSession | undefined;
        const tokenMethod = this.configService.get(
            'authConfig.tokenMethod',
        ) as TokenMethod;

        const sessionToken = extractSessionToken(req, tokenMethod);

        if (sessionToken) {
            serializedSession = await this.sessionService.getSessionFromToken(
                sessionToken,
            );

            if (serializedSession) {
                return serializedSession;
            }

            // if there is a token but it cannot be validated to a Session,
            // then the token is no longer valid and should be unset.
            setSessionToken({
                req,
                res,
                tokenMethod,
                authTokenHeaderKey: this.configService.get(
                    'authConfig.authTokenHeaderKey',
                ),
                rememberMe: false,
                sessionToken: '',
            });
        }

        if (hasOwnerPermission && !serializedSession) {
            // create anonymous session
            // set session token
        }

        return serializedSession;
    }

    // Return true if the guard is being called by @ResolveField, i.e, not a top level Query or Mutation.s
    private isFieldResolver(info?: GraphQLResolveInfo): boolean {
        if (!info) return false;

        const parentType = info?.parentType?.name;

        return parentType !== 'Query' && parentType !== 'Mutation';
    }
}
