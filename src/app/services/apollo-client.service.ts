import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { Config } from '../config';

const ni = createNetworkInterface(Config.GRAPHQL_API_ENDPOINT);
ni.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    const token = localStorage.getItem('access_token');
    req.options.headers.authorization = token == null ?
      null : 'Bearer ' + token;
    next();
  }
}]);
const client = new ApolloClient({
  networkInterface: ni
});

export function provideClient(): ApolloClient {
  return client;
}
