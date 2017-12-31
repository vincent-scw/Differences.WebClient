import { environment } from '../environments/environment';

export interface AuthPolicyConfig {
    tenantName: string;
    clientId: string;
    scopes: string[];
    signPolicy: string;
    editProfilePolicy: string;
    forgotPasswordPolicy: string;
}
/**
 * Configuration data for the app, as in Config.cs.
 */
export class Config {

    public static readonly AUTH_SETTINGS: AuthPolicyConfig = environment.authSettings;

    public static readonly API_ENDPOINT: string = environment.apiServerUrl + '/api';

    public static readonly GRAPHQL_API_ENDPOINT: string = environment.apiServerUrl + '/api/graphql';

    public static readonly DEFAULT_REDIRECT_URL: string = environment.selfUrl + '/questions';
}
