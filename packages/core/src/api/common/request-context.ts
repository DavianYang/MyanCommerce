import { Request } from 'express';
import { ApiType } from './get-api-type';

/**
 * @description
 * The RequestContext holds information relevant to the current request, which may be
 * required at various points of the stack.
 *
 * It is a good practice to inject the RequestContext (using the {@link Ctx} decorator) into
 * _all_ resolvers & REST handlers, and then pass it through to the service layer.
 *
 * This allows the service layer to access information about the current user, the active language,
 * the active Channel, and so on. In addition, the {@link TransactionalConnection} relies on the
 * presence of the RequestContext object in order to correctly handle per-request database transactions.
 *
 * @example
 * ```TypeScript
 * \@Query()
 * myQuery(\@Ctx() ctx: RequestContext) {
 *   return this.myService.getData(ctx);
 * }
 * ```
 * @docsCategory request
 */
export class RequestContext {
    private readonly _req?: Request;
    private readonly _isAuthorized: boolean;
    private readonly _authorizedAsOwnerOnly: boolean;
    private readonly _apiType: ApiType;

    constructor(options: {
        req?: Request;
        apiType: ApiType;
        isAuthorized: boolean;
        authorizedAsOwnerOnly: boolean;
    }) {
        const { req, apiType } = options;
        this._req = req;
        this._apiType = apiType;
        this._isAuthorized = options.isAuthorized;
        this._authorizedAsOwnerOnly = options.authorizedAsOwnerOnly;
    }

    /**
     * @description
     * The raw Express request object.
     */
    get req(): Request | undefined {
        return this._req;
    }

    /**
     * @description
     * Signals which API this request was received by, e.g. 'admin' or 'shop'.
     */
    get apiType(): ApiType {
        return this._apiType;
    }

    /**
     * @description
     * True if the current session is authorized to access the current resolver method.
     *
     * @deprecated Use `userHasPermissions()` method instead.
     */
    get isAuthorized(): boolean {
        return this._isAuthorized;
    }

    /**
     * @description
     * True if the current anonymous session is only authorized to operate on entities that
     * are owned by the current session.
     */
    get authorizedAsOwnerOnly(): boolean {
        return this._authorizedAsOwnerOnly;
    }
}
