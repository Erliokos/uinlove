import { authorization } from '@/client/authorization';
import { onError } from '@apollo/client/link/error';

export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (!graphQLErrors?.length) return forward(operation);

  for (const error of graphQLErrors) {
    switch (error?.extensions?.code) {
      case 'UNAUTHENTICATED': {
        authorization.logout();
        break;
      }
      default: {
        forward(operation);
      }
    }
  }

});
