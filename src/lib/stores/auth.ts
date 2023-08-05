import {create} from 'zustand';
import * as type from './interfaces';

export const userStore = create<type.UserStoreProps>(set => ({
  userId: '',
  setUserId: (value: string) => set(() => ({userId: value})),
}));

export const loginStore = create<type.LoginStoreProps>(set => ({
  isLoading: false,
  error: '',
  email: '',
  password: '',
  setIsLoading: (value: boolean) => set(() => ({isLoading: value})),
  setError: (value: string) => set(() => ({error: value})),
  setEmail: (value: string) => set(() => ({email: value})),
  setPassword: (value: string) => set(() => ({password: value})),
  setDefault: () =>
    set(() => ({
      isLoading: false,
      name: '',
      email: '',
      password: '',
    })),
}));

export const registerStore = create<type.RegisterStoreProps>(set => ({
  isLoading: false,
  error: '',
  name: '',
  email: '',
  password: '',
  setIsLoading: (value: boolean) => set(() => ({isLoading: value})),
  setError: (value: string) => set(() => ({error: value})),
  setName: (value: string) => set(() => ({name: value})),
  setEmail: (value: string) => set(() => ({email: value})),
  setPassword: (value: string) => set(() => ({password: value})),
  setDefault: () =>
    set(() => ({
      isLoading: false,
      name: '',
      email: '',
      password: '',
    })),
}));
