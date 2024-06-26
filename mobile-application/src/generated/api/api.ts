/// <reference path="./custom.d.ts" />
// tslint:disable
/**
 * QMS Display API
 * The API for the QMS Display Application.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */

import * as url from "url";
import isomorphicFetch from "isomorphic-fetch";
import { Configuration } from "./configuration";

const BASE_PATH = "/".replace(/\/+$/, "");

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};

/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
    (url: string, init?: any): Promise<Response>;
}

/**
 *
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
    url: string;
    options: any;
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    protected configuration: Configuration;

    constructor(configuration?: Configuration, protected basePath: string = BASE_PATH, protected fetch: FetchAPI = isomorphicFetch) {
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
}

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    name = "RequiredError"
    constructor(public field: string, msg?: string) {
        super(msg);
    }
}

/**
 * API general response
 * @export
 * @interface APIResponse
 */
export interface APIResponse {
    /**
     * 
     * @type {string}
     * @memberof APIResponse
     */
    code: string;
    /**
     * 
     * @type {string}
     * @memberof APIResponse
     */
    type: string;
    /**
     * 
     * @type {string}
     * @memberof APIResponse
     */
    message: string;
}
/**
 * Authorize device response  Args:     BaseModel (class): Base model class
 * @export
 * @interface AuthorizeDeviceResponse
 */
export interface AuthorizeDeviceResponse {
    /**
     * 
     * @type {AuthorizeDeviceResponseData}
     * @memberof AuthorizeDeviceResponse
     */
    data: AuthorizeDeviceResponseData;
}
/**
 * Authorize device response data  Args:     BaseModel (class): Base model class
 * @export
 * @interface AuthorizeDeviceResponseData
 */
export interface AuthorizeDeviceResponseData {
    /**
     * 
     * @type {string}
     * @memberof AuthorizeDeviceResponseData
     */
    deviceCode: string;
    /**
     * 
     * @type {string}
     * @memberof AuthorizeDeviceResponseData
     */
    userCode: string;
    /**
     * 
     * @type {number}
     * @memberof AuthorizeDeviceResponseData
     */
    expiresIn: number;
    /**
     * 
     * @type {number}
     * @memberof AuthorizeDeviceResponseData
     */
    interval: number;
    /**
     * 
     * @type {string}
     * @memberof AuthorizeDeviceResponseData
     */
    verificationURI: string;
}
/**
 * Get new access token payload  Args:     BaseModel (class): Base model class
 * @export
 * @interface GetNewAccessTokenPayload
 */
export interface GetNewAccessTokenPayload {
    /**
     * 
     * @type {string}
     * @memberof GetNewAccessTokenPayload
     */
    refreshToken: string;
}
/**
 * Get new access token response  Args:     BaseModel (class): Base model class
 * @export
 * @interface GetNewAccessTokenResponse
 */
export interface GetNewAccessTokenResponse {
    /**
     * 
     * @type {GetNewAccessTokenResponseData}
     * @memberof GetNewAccessTokenResponse
     */
    data: GetNewAccessTokenResponseData;
}
/**
 * Get new access token response data  Args:     BaseModel (class): Base model class
 * @export
 * @interface GetNewAccessTokenResponseData
 */
export interface GetNewAccessTokenResponseData {
    /**
     * 
     * @type {string}
     * @memberof GetNewAccessTokenResponseData
     */
    accessToken: string;
    /**
     * 
     * @type {number}
     * @memberof GetNewAccessTokenResponseData
     */
    expiresIn: number;
}
/**
 * Payload to get the device tokens  Args:     BaseModel (class): Base model class
 * @export
 * @interface GetTokensPayload
 */
export interface GetTokensPayload {
    /**
     * 
     * @type {string}
     * @memberof GetTokensPayload
     */
    deviceCode: string;
}
/**
 * Get tokens response  Args:     BaseModel (class): Base model class
 * @export
 * @interface GetTokensResponse
 */
export interface GetTokensResponse {
    /**
     * 
     * @type {GetTokensResponseData}
     * @memberof GetTokensResponse
     */
    data: GetTokensResponseData;
}
/**
 * Get tokens response data  Args:     BaseModel (class): Base model class
 * @export
 * @interface GetTokensResponseData
 */
export interface GetTokensResponseData {
    /**
     * 
     * @type {string}
     * @memberof GetTokensResponseData
     */
    accessToken: string;
    /**
     * 
     * @type {string}
     * @memberof GetTokensResponseData
     */
    refreshToken: string;
    /**
     * 
     * @type {number}
     * @memberof GetTokensResponseData
     */
    expiresIn: number;
    /**
     * 
     * @type {number}
     * @memberof GetTokensResponseData
     */
    refreshExpiresIn: number;
}
/**
 * Service Turn Status Item data     
 * @export
 * @interface ServiceTurnStatusItem
 */
export interface ServiceTurnStatusItem {
    /**
     * 
     * @type {string}
     * @memberof ServiceTurnStatusItem
     */
    ticketNumber: string;
    /**
     * 
     * @type {string}
     * @memberof ServiceTurnStatusItem
     */
    queueName: string;
    /**
     * 
     * @type {string}
     * @memberof ServiceTurnStatusItem
     */
    statusName: string;
    /**
     * 
     * @type {string}
     * @memberof ServiceTurnStatusItem
     */
    statusCode: string;
}
/**
 * AuthApi - fetch parameter creator
 * @export
 */
export const AuthApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Authorize a device to an application in context  Args:     application (str, optional): The application in context.  Returns:     models.AuthorizeDeviceResponse: Authorization information such as deviceCode, and userCode.
         * @summary Authorize Device
         * @param {string} application 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authorizeDevice(application: string, options: any = {}): FetchArgs {
            // verify required parameter 'application' is not null or undefined
            if (application === null || application === undefined) {
                throw new RequiredError('application','Required parameter application was null or undefined when calling authorizeDevice.');
            }
            const localVarPath = `/api/v1/auth/device`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (application !== undefined && application !== null) {
                localVarHeaderParameter['application'] = String(application);
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            localVarUrlObj.search = null;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Gets the authorization tokens for the given device code and application in context  Args:     application (str, optional): The application in context.     item (models.GetTokensPayload): The required payload  Returns:     models.GetTokensResponse: The authorization tokens information
         * @summary Get Auth Tokens
         * @param {GetTokensPayload} body 
         * @param {string} application 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAuthTokens(body: GetTokensPayload, application: string, options: any = {}): FetchArgs {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling getAuthTokens.');
            }
            // verify required parameter 'application' is not null or undefined
            if (application === null || application === undefined) {
                throw new RequiredError('application','Required parameter application was null or undefined when calling getAuthTokens.');
            }
            const localVarPath = `/api/v1/auth/tokens`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (application !== undefined && application !== null) {
                localVarHeaderParameter['application'] = String(application);
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            localVarUrlObj.search = null;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"GetTokensPayload" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body =  needsSerialization ? JSON.stringify(body || {}) : (body || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Gets a new access token for the given refresh token and application in context  Args:     application (str, optional): The application in context.     item (models.GetNewAccessTokenPayload): The required payload  Returns:     models.GetNewAccessTokenResponse: The new access token information
         * @summary Get New Access Token
         * @param {GetNewAccessTokenPayload} body 
         * @param {string} application 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getNewAccessToken(body: GetNewAccessTokenPayload, application: string, options: any = {}): FetchArgs {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling getNewAccessToken.');
            }
            // verify required parameter 'application' is not null or undefined
            if (application === null || application === undefined) {
                throw new RequiredError('application','Required parameter application was null or undefined when calling getNewAccessToken.');
            }
            const localVarPath = `/api/v1/auth/token/refresh`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (application !== undefined && application !== null) {
                localVarHeaderParameter['application'] = String(application);
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            localVarUrlObj.search = null;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"GetNewAccessTokenPayload" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body =  needsSerialization ? JSON.stringify(body || {}) : (body || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AuthApi - functional programming interface
 * @export
 */
export const AuthApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Authorize a device to an application in context  Args:     application (str, optional): The application in context.  Returns:     models.AuthorizeDeviceResponse: Authorization information such as deviceCode, and userCode.
         * @summary Authorize Device
         * @param {string} application 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authorizeDevice(application: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AuthorizeDeviceResponse> {
            const localVarFetchArgs = AuthApiFetchParamCreator(configuration).authorizeDevice(application, options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Gets the authorization tokens for the given device code and application in context  Args:     application (str, optional): The application in context.     item (models.GetTokensPayload): The required payload  Returns:     models.GetTokensResponse: The authorization tokens information
         * @summary Get Auth Tokens
         * @param {GetTokensPayload} body 
         * @param {string} application 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAuthTokens(body: GetTokensPayload, application: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetTokensResponse> {
            const localVarFetchArgs = AuthApiFetchParamCreator(configuration).getAuthTokens(body, application, options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Gets a new access token for the given refresh token and application in context  Args:     application (str, optional): The application in context.     item (models.GetNewAccessTokenPayload): The required payload  Returns:     models.GetNewAccessTokenResponse: The new access token information
         * @summary Get New Access Token
         * @param {GetNewAccessTokenPayload} body 
         * @param {string} application 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getNewAccessToken(body: GetNewAccessTokenPayload, application: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetNewAccessTokenResponse> {
            const localVarFetchArgs = AuthApiFetchParamCreator(configuration).getNewAccessToken(body, application, options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * AuthApi - factory interface
 * @export
 */
export const AuthApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * Authorize a device to an application in context  Args:     application (str, optional): The application in context.  Returns:     models.AuthorizeDeviceResponse: Authorization information such as deviceCode, and userCode.
         * @summary Authorize Device
         * @param {string} application 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authorizeDevice(application: string, options?: any) {
            return AuthApiFp(configuration).authorizeDevice(application, options)(fetch, basePath);
        },
        /**
         * Gets the authorization tokens for the given device code and application in context  Args:     application (str, optional): The application in context.     item (models.GetTokensPayload): The required payload  Returns:     models.GetTokensResponse: The authorization tokens information
         * @summary Get Auth Tokens
         * @param {GetTokensPayload} body 
         * @param {string} application 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAuthTokens(body: GetTokensPayload, application: string, options?: any) {
            return AuthApiFp(configuration).getAuthTokens(body, application, options)(fetch, basePath);
        },
        /**
         * Gets a new access token for the given refresh token and application in context  Args:     application (str, optional): The application in context.     item (models.GetNewAccessTokenPayload): The required payload  Returns:     models.GetNewAccessTokenResponse: The new access token information
         * @summary Get New Access Token
         * @param {GetNewAccessTokenPayload} body 
         * @param {string} application 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getNewAccessToken(body: GetNewAccessTokenPayload, application: string, options?: any) {
            return AuthApiFp(configuration).getNewAccessToken(body, application, options)(fetch, basePath);
        },
    };
};

/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export class AuthApi extends BaseAPI {
    /**
     * Authorize a device to an application in context  Args:     application (str, optional): The application in context.  Returns:     models.AuthorizeDeviceResponse: Authorization information such as deviceCode, and userCode.
     * @summary Authorize Device
     * @param {string} application 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authorizeDevice(application: string, options?: any) {
        return AuthApiFp(this.configuration).authorizeDevice(application, options)(this.fetch, this.basePath);
    }

    /**
     * Gets the authorization tokens for the given device code and application in context  Args:     application (str, optional): The application in context.     item (models.GetTokensPayload): The required payload  Returns:     models.GetTokensResponse: The authorization tokens information
     * @summary Get Auth Tokens
     * @param {GetTokensPayload} body 
     * @param {string} application 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public getAuthTokens(body: GetTokensPayload, application: string, options?: any) {
        return AuthApiFp(this.configuration).getAuthTokens(body, application, options)(this.fetch, this.basePath);
    }

    /**
     * Gets a new access token for the given refresh token and application in context  Args:     application (str, optional): The application in context.     item (models.GetNewAccessTokenPayload): The required payload  Returns:     models.GetNewAccessTokenResponse: The new access token information
     * @summary Get New Access Token
     * @param {GetNewAccessTokenPayload} body 
     * @param {string} application 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public getNewAccessToken(body: GetNewAccessTokenPayload, application: string, options?: any) {
        return AuthApiFp(this.configuration).getNewAccessToken(body, application, options)(this.fetch, this.basePath);
    }

}
/**
 * ServiceturnsApi - fetch parameter creator
 * @export
 */
export const ServiceturnsApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Gets the audio of a turn
         * @summary Get Turn Audio
         * @param {string} turnName 
         * @param {string} application 
         * @param {string} authorization 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTurnAudio(turnName: string, application: string, authorization: string, options: any = {}): FetchArgs {
            // verify required parameter 'turnName' is not null or undefined
            if (turnName === null || turnName === undefined) {
                throw new RequiredError('turnName','Required parameter turnName was null or undefined when calling getTurnAudio.');
            }
            // verify required parameter 'application' is not null or undefined
            if (application === null || application === undefined) {
                throw new RequiredError('application','Required parameter application was null or undefined when calling getTurnAudio.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling getTurnAudio.');
            }
            const localVarPath = `/api/v1/serviceturns/audio`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (turnName !== undefined) {
                localVarQueryParameter['turn_name'] = turnName;
            }

            if (application !== undefined && application !== null) {
                localVarHeaderParameter['application'] = String(application);
            }

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['authorization'] = String(authorization);
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            localVarUrlObj.search = null;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Gets turns status table for the application in context
         * @summary Get Turns Status Table
         * @param {string} application 
         * @param {string} authorization 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTurnsStatusTable(application: string, authorization: string, options: any = {}): FetchArgs {
            // verify required parameter 'application' is not null or undefined
            if (application === null || application === undefined) {
                throw new RequiredError('application','Required parameter application was null or undefined when calling getTurnsStatusTable.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling getTurnsStatusTable.');
            }
            const localVarPath = `/api/v1/serviceturns/status-table`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (application !== undefined && application !== null) {
                localVarHeaderParameter['application'] = String(application);
            }

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['authorization'] = String(authorization);
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            localVarUrlObj.search = null;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ServiceturnsApi - functional programming interface
 * @export
 */
export const ServiceturnsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Gets the audio of a turn
         * @summary Get Turn Audio
         * @param {string} turnName 
         * @param {string} application 
         * @param {string} authorization 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTurnAudio(turnName: string, application: string, authorization: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
            const localVarFetchArgs = ServiceturnsApiFetchParamCreator(configuration).getTurnAudio(turnName, application, authorization, options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Gets turns status table for the application in context
         * @summary Get Turns Status Table
         * @param {string} application 
         * @param {string} authorization 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTurnsStatusTable(application: string, authorization: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Array<ServiceTurnStatusItem>> {
            const localVarFetchArgs = ServiceturnsApiFetchParamCreator(configuration).getTurnsStatusTable(application, authorization, options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * ServiceturnsApi - factory interface
 * @export
 */
export const ServiceturnsApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * Gets the audio of a turn
         * @summary Get Turn Audio
         * @param {string} turnName 
         * @param {string} application 
         * @param {string} authorization 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTurnAudio(turnName: string, application: string, authorization: string, options?: any) {
            return ServiceturnsApiFp(configuration).getTurnAudio(turnName, application, authorization, options)(fetch, basePath);
        },
        /**
         * Gets turns status table for the application in context
         * @summary Get Turns Status Table
         * @param {string} application 
         * @param {string} authorization 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTurnsStatusTable(application: string, authorization: string, options?: any) {
            return ServiceturnsApiFp(configuration).getTurnsStatusTable(application, authorization, options)(fetch, basePath);
        },
    };
};

/**
 * ServiceturnsApi - object-oriented interface
 * @export
 * @class ServiceturnsApi
 * @extends {BaseAPI}
 */
export class ServiceturnsApi extends BaseAPI {
    /**
     * Gets the audio of a turn
     * @summary Get Turn Audio
     * @param {string} turnName 
     * @param {string} application 
     * @param {string} authorization 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceturnsApi
     */
    public getTurnAudio(turnName: string, application: string, authorization: string, options?: any) {
        return ServiceturnsApiFp(this.configuration).getTurnAudio(turnName, application, authorization, options)(this.fetch, this.basePath);
    }

    /**
     * Gets turns status table for the application in context
     * @summary Get Turns Status Table
     * @param {string} application 
     * @param {string} authorization 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServiceturnsApi
     */
    public getTurnsStatusTable(application: string, authorization: string, options?: any) {
        return ServiceturnsApiFp(this.configuration).getTurnsStatusTable(application, authorization, options)(this.fetch, this.basePath);
    }

}
