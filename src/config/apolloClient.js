import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache, ApolloClient } from 'apollo-boost';


const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql',
  });
  
  const authMiddleware = (authToken) =>
    new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      if (authToken) {
        operation.setContext({
          headers: {
            authorization: `Khang ${authToken}`,
          },
        });
      }
  
      return forward(operation);
    });
  
  const cache = new InMemoryCache({});
  
  export const useAppApolloClient = (authToken) => {
    //const [authToken] = useAuthToken();
    return new ApolloClient({
      link: authMiddleware(authToken).concat(httpLink),
      cache,
    });
  };