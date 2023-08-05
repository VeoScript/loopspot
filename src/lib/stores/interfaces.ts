export interface LoginStoreProps extends Omit<RegisterStoreProps, 'name' | 'setName' | 'repassword' | 'setRepassword' > {}

export interface RegisterStoreProps {
  isLoading: boolean;
  error: string;
  name: string;
  email: string;
  password: string;
  repassword: string;
  setIsLoading: (value: boolean) => void;
  setError: (value: string) => void;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setRepassword: (value: string) => void;
  setDefault: () => void;
}

export interface UserStoreProps {
  userId: string;
  setUserId: (value: string) => void;
}
