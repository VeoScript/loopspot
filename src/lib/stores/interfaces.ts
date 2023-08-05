export interface LoginStoreProps extends Omit<RegisterStoreProps, 'name' | 'setName' > {}

export interface RegisterStoreProps {
  isLoading: boolean;
  error: string;
  name: string;
  email: string;
  password: string;
  setIsLoading: (value: boolean) => void;
  setError: (value: string) => void;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setDefault: () => void;
}

export interface UserStoreProps {
  userId: string;
  setUserId: (value: string) => void;
}
