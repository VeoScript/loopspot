import {create} from 'zustand';
import * as type from './interfaces';

export const menuModalStore = create<type.MenuModalProps>(set => ({
  isVisible: false,
  setIsVisible: (value: boolean) => set(() => ({isVisible: value})),
}));
