import {create} from 'zustand';
import * as type from './interfaces';

export const menuModalStore = create<type.MenuModalProps>(set => ({
  isVisible: false,
  setIsVisible: (value: boolean) => set(() => ({isVisible: value})),
}));

export const uploadProfileModalStore = create<type.UploadProfileProps>(set => ({
  isVisible: false,
  setIsVisible: (value: boolean) => set(() => ({isVisible: value})),
  photo: '',
  setPhoto: (value: any) => set(() => ({photo: value})),
}));
