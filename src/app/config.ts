import { environment } from '../environments/environment';
/**
 * Configuration data for the app, as in Config.cs.
 */
export class Config {

    public static readonly AUTH_SETTINGS: any = environment.authSettings;

    public static readonly API_ENDPOINT: string = environment.apiServerUrl + '/api';

    public static readonly GRAPHQL_API_ENDPOINT: string = environment.apiServerUrl + '/api/graphql';
}
