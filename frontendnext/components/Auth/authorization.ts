import { UserEntity } from "@/generated/operations";

const storage = typeof window !== "undefined" ? localStorage : null;

enum EStorageField {
  USERDATA = 'USERDATA',
  UIN_TOKEN = 'UIN_TOKEN',
  UIN_REFRESH_TOKEN = 'UIN_REFRESH_TOKEN',
}

// type Token = {
//   token: string;
//   expiration: string;
// };

export const authorization = {

  setCurrentUser(user: Partial<UserEntity & { Languge: string }>) {
    if (!storage) return;
    storage.setItem(EStorageField.USERDATA, JSON.stringify(user));
  },

  setAuthorizationToken(token: string) {
    if (!storage) return;
    storage.setItem(EStorageField.UIN_TOKEN, JSON.stringify(token));
  },

  setRefreshToken(refreshToken: string) {
    if (!storage) return;
    storage.setItem(EStorageField.UIN_REFRESH_TOKEN, JSON.stringify(refreshToken));
  },

  logout() {
    if (!storage) return;
    storage.removeItem(EStorageField.USERDATA);
    storage.removeItem(EStorageField.UIN_TOKEN);
    storage.removeItem(EStorageField.UIN_REFRESH_TOKEN);
  },

  removeUser() {
    if (!storage) return;
    storage.removeItem(EStorageField.USERDATA);
  },

  removeToken() {
    if (!storage) return;
    storage.removeItem(EStorageField.UIN_TOKEN);
  },

  removeRefreshToken() {
    if (!storage) return;
    storage.removeItem(EStorageField.UIN_REFRESH_TOKEN);
  },

  getCurrentToken(): string | null {
    if (!storage) return null;
    const token = storage.getItem(EStorageField.UIN_TOKEN);
    try {
      return token ? JSON.parse(token) : null;
    } catch (e) {
      return null;
    }
  },

  getCurrentRefreshToken(): string | null {
    if (!storage) return null;
    const refreshToken = storage.getItem(EStorageField.UIN_REFRESH_TOKEN);
    try {
      return refreshToken ? JSON.parse(refreshToken) : null;
    } catch (e) {
      return null;
    }
  },

  getCurrentLogin() {
    return this.getCurrentUser()?.email;
  },

  getCurrentUserId() {
    return this.getCurrentUser()?.id ?? '';
  },

  getCurrentUserName() {
    return this.getCurrentUser()?.name;
  },

  getCurrentUserInitials() {
    const nameAndSurname = this.getCurrentUserName()?.split(' ').slice(0, 2);

    if (!Array.isArray(nameAndSurname) || nameAndSurname.length < 2) return undefined;

    return `${nameAndSurname[0]} ${nameAndSurname[1][0]}.`;
  },

  getCurrentUser(): Partial<UserEntity & {Languge: string}> | null {
    if (!storage) return null;
    const user = storage.getItem(EStorageField.USERDATA);
    try {
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  },
};
