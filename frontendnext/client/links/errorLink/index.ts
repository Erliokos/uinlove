import { onError } from '@apollo/client/link/error';

export const errorLink = onError(({ graphQLErrors, forward, operation }) => {
  if (!graphQLErrors?.length) return forward(operation);

  for (const error of graphQLErrors) {
    switch (error?.extensions?.code) {
      default: {
        forward(operation);
      }
    }
  }
});
