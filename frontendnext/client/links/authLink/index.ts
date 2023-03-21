import { getAuthorizationHeader } from '@/client/utils/getAuthorizationHeader';
import { setContext } from '@apollo/client/link/context';

export const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      ...getAuthorizationHeader(),
    },
  };
});
