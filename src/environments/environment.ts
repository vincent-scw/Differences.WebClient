// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  selfUrl: 'http://localhost:4200',
  apiServerUrl: 'http://localhost:5022',
  state: 'BCEeFWf45A53sdfaef434',
  linkedIn: {
    clientId: '812axnss5vd45l',
    redirectUrl: 'http://localhost:4200/oauth2/linkedin',
    scope: 'r_basicprofile'
  },
  microsoft: {
    clientId: '5e957a8e-fa2a-4482-a502-fdcc9fa3f418',
    redirectUrl: 'http://localhost:4200/oauth2/microsoft',
    scope: 'wl.basic'
  }
};
