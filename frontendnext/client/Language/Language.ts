import { authorization } from "../authorization";


export enum Russian {
  Create = 'Создать',
  Cancel = 'Отмена',
  SignIn = 'Авторизация',
  SignUp = 'Регистрация',
  Register = 'Регистрация',
  EmailAddress = 'Email',
  Password = 'Пароль',
  KeepMeLoggedIn = 'Запомнить меня',
  DontHaveAnAccount = 'Нет профиля?',
  Login = 'Войти',
  RequiredToFill = 'Обязательно для заполнения',
  Name = 'Имя',
  RepeatThePassword = 'Повторите пароль',
  YourPasswordsDoNoMatch = 'Пароли не совпадают',
  InvalidEmail = 'Неверный формат Email',
  LogOut = 'Выйти',
  Home = 'Главная',
  Dashboard = 'Панель элементов',
  Analytics = 'Аналитика',
  Settings = 'Настройки',
  Releases = 'Релизы',
  Account = 'Аккаунт',
  Security = 'Безопастность',
  InvalidUserInput = 'Неверный пользовательский ввод',
  YourPassword = 'Введите пароль',
  RepeatPassword = 'Повторите пароль',
  CreatePost = 'Добавить пубпликацию',
  Language = 'Язык',
  Theme = 'Тема',
  English = 'Английский',
  Russian = 'Русский',
  AutorName = 'Автор',
  TitleOfThePublication = 'Название публикации',
  TextOfThePublication = "Текст публикации",
  Edit = 'Редактировать',
  Close = 'Закрыть',
  Confirm = 'Подтвердить',
}

export enum English {
  Create = 'Create',
  Cancel = 'Cancel',
  SignIn = 'Sign in',
  SignUp = 'Sign up',
  Register = 'Register',
  EmailAddress = 'Email Address',
  Password = 'Password',
  KeepMeLoggedIn = 'Keep me logged in',
  DontHaveAnAccount = 'Don&apos;t have an account?',
  Login = 'Login',
  RequiredToFill = 'Required to fill',
  Name = 'Name',
  RepeatThePassword = 'Repeat the password',
  YourPasswordsDoNoMatch = 'Your passwords do no match',
  InvalidEmail = 'Invalid email',
  LogOut = 'LogOut',
  Home = 'Home',
  Dashboard = 'Dashboard',
  Analytics = 'Analytics',
  Settings = 'Settings',
  Releases = 'Releases',
  Account = 'Account',
  Security = 'Security',
  InvalidUserInput = 'invalid user input',
  YourPassword = 'Your password',
  RepeatPassword = 'repeat password',
  CreatePost = 'Create post',
  Language = 'Language',
  Theme = 'Theme',
  English = 'English',
  Russian = 'Russian',
  AutorName = 'Author',
  TitleOfThePublication = 'Title of the publication',
  TextOfThePublication = 'Text of the publication',
  Edit = 'Edit',
  Close = 'Close',
  Confirm = 'Confirm',
}

const Language = {
  English: English,
  Russian: Russian
};

export const useTranslate = () => {
  const language = authorization.getCurrentLanguage();
  switch (language) {
    case 'English':
      return Language['English'];
    default: return Language['Russian'];
  }
};
