import { EEnglish, ERussian } from "./language";

export enum EName {
  Create = 'Create',
  Cancel = 'Cancel',
  SignIn = 'SignIn',
  SignUp = 'SignUp'
}

export enum ELanguage {
  English = 'English',
  Russian = 'Russian',
}

export const  Language = {
  English: EEnglish,
  Russian: ERussian
}
