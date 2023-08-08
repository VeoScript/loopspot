import {create} from 'zustand';
import * as type from './interfaces';

export const menuModalStore = create<type.MenuModalProps>(set => ({
  isVisible: false,
  setIsVisible: (value: boolean) => set(() => ({isVisible: value})),
}));

export const uploadProfileModalStore = create<type.UploadImageProps>(set => ({
  isVisible: false,
  setIsVisible: (value: boolean) => set(() => ({isVisible: value})),
  photo: null,
  setPhoto: (value: any) => set(() => ({photo: value})),
}));

export const uploadCoverModalStore = create<type.UploadImageProps>(set => ({
  isVisible: false,
  setIsVisible: (value: boolean) => set(() => ({isVisible: value})),
  photo: null,
  setPhoto: (value: any) => set(() => ({photo: value})),
}));
