

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
  Name = 'Логин',
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
  Security = 'Безопастность'
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
  Security = 'Security'
}

export const Language = {
  English: English,
  Russian: Russian
};

export const getTXT = () => {
  if (typeof window === "undefined") return Language['Russian'];
  const UserJson = localStorage.getItem('USERDATA');
  const User = UserJson ? JSON.parse(UserJson) : { Languge: 'Russian' };
  switch (User.Languge) {
    case 'English':
      return Language['English'];
    default: return Language['Russian'];
  }
};
