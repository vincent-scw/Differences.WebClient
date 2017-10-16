export const environment = {
  production: true,
  apiServerUrl: 'https://differencesapi.azurewebsites.net',
  authSettings: {
    tenantName: 'DifferencesB2CTenant.onmicrosoft.com',
    clientId: '8c73e2ca-6062-4793-ae08-42723068a8e2',
    scopes: ['https://DifferencesB2CTenant.onmicrosoft.com/api/read openid offline_access'],
    policyName: 'B2C_1_Sign',
  }
};
