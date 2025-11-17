/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * Enum for the authentication types.
 */
export enum AuthenticationType {
    BASIC = "BASIC",
    CLIENT_CREDENTIAL = "CLIENT_CREDENTIAL"
}

/**
 * Class containing common constants for external API authentication.
 * These constants are shared between email and SMS providers.
 */
export class ExternalApiAuthenticationConstants {

    private constructor() { }

    // Authentication field names
    public static readonly USERNAME: string = "userName";
    public static readonly PASSWORD: string = "password";
    public static readonly CLIENT_ID: string = "clientId";
    public static readonly CLIENT_SECRET: string = "clientSecret";
    public static readonly TOKEN_ENDPOINT: string = "tokenEndpoint";
    public static readonly SCOPES: string = "scopes";
    public static readonly AUTHENTICATION_TYPE: string = "authenticationType";

    // Authentication type values
    public static readonly AUTHENTICATION_TYPE_BASIC: string = "BASIC";
    public static readonly AUTHENTICATION_TYPE_CLIENT_CREDENTIAL: string = "CLIENT_CREDENTIAL";
}
