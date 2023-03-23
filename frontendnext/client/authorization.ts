import { Language, UserEntity } from "@/generated/operations";
import { ColorScheme } from "@mantine/core";

const storage = typeof window !== "undefined" ? localStorage : null;

enum EStorageField {
  USERDATA = 'USERDATA',
  UIN_TOKEN = 'UIN_TOKEN',
  UIN_REFRESH_TOKEN = 'UIN_REFRESH_TOKEN',
  LANGUAGE = 'LANGUAGE',
  THEME = 'THEME',
}

export const authorization = {

  setCurrentUser(user: Partial<UserEntity>) {
    if (!storage) return;
    storage.setItem(EStorageField.USERDATA, JSON.stringify(user));
  },

  setCurrentLanguage(languge: string) {
    if (!storage) return;
    storage.setItem(EStorageField.LANGUAGE, JSON.stringify(languge));
  },

  setCurrentTheme(colorScheme: string) {
    if (!storage) return;
    storage.setItem(EStorageField.THEME, JSON.stringify(colorScheme));
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
    storage.removeItem(EStorageField.LANGUAGE);
    storage.removeItem(EStorageField.THEME);
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

  getCurrentLanguage(): Language {
    if (!storage) return Language.RUSSIAN;
    const languge = storage.getItem(EStorageField.LANGUAGE);
    try {
      return languge ? JSON.parse(languge) : Language.RUSSIAN;
    } catch (e) {
      return Language.RUSSIAN;
    }
  },

  getCurrentTheme(): ColorScheme {
    if (!storage) return 'dark';
    const colorScheme = storage.getItem(EStorageField.THEME);
    try {
      return colorScheme ? JSON.parse(colorScheme) : 'dark';
    } catch (e) {
      return 'dark';
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

  getCurrentUser(): Partial<UserEntity> | null {
    if (!storage) return null;
    const user = storage.getItem(EStorageField.USERDATA);
    try {
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  },
};
