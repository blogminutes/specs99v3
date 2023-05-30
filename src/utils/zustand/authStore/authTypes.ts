export type IAuthStore = {
  loggedIn: boolean;
  user: null | IUser;
  setUser: (loggedIn: boolean, user: IUser | null) => void;
};

export type IUser = {
  $createdAt: string;
  $id: string;
  $updatedAt: string;
  email: string;
  emailVerification: boolean;
  name: string;
  passwordUpdate: string;
  phone: string;
  phoneVerification: boolean;
  prefs: any;
  registration: string;
  status: boolean;
};
