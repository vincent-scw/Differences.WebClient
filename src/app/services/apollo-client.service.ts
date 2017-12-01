import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { Apollo } from 'apollo-angular';
import { IntermediaryService } from './intermediary.service';
import { Config } from '../config';

const network = createNetworkInterface(Config.GRAPHQL_API_ENDPOINT);
network.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    const token = localStorage.getItem('access_token');
    if (token != null) {
      req.options.headers['authorization'] = `Bearer ${token}`;
    }

    next();
  }
}]);

// Handle response error codes.
network.useAfter([{
  applyAfterware(res, next) {
    if (res.response.status === 401) {
      throw new Error('Unauthorized');
    } else if (res.response.status === 400) {
      alert(JSON.stringify(res.response.body));
    } else if (res.response.status === 500) {
      throw new Error('Server Error');
    }
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface: network
});

export function provideClient(): ApolloClient {
  return client;
}
