// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  apiServerUrl: 'https://differencesapi.azurewebsites.net',
  // apiServerUrl: 'http://localhost:5022',
  authSettings: {
    tenantName: 'DifferencesB2CTenant.onmicrosoft.com',
    clientId: '8c73e2ca-6062-4793-ae08-42723068a8e2',
    scopes: ['https://DifferencesB2CTenant.onmicrosoft.com/api/read openid offline_access'],
    policyName: 'B2C_1_Sign',
  }
};
