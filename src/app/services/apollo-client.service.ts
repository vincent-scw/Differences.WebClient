import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { Config } from '../config';

const ni = createNetworkInterface(Config.GRAPHQL_API_ENDPOINT);
ni.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    req.options.headers.authorization =
      'Bearer ' + localStorage.getItem('access_token') || null;
    next();
  }
}]);
const client = new ApolloClient({
  networkInterface: ni
});

export function provideClient(): ApolloClient {
  return client;
}
