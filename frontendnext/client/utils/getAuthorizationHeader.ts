import { authorization } from "../authorization";


export function getAuthorizationHeader() {

  const token = authorization.getCurrentToken();

  return {
    authorization: token ? `Bearer ${token}` : '',
  };
}
