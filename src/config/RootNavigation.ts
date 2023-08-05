import {createNavigationContainerRef} from '@react-navigation/native';

interface NavigationInterface {
  navigationRef: {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
    isReady: boolean;
  };
}

export const navigationRef =
  createNavigationContainerRef<NavigationInterface>();

export function useNavigate(screen: any, params?: any): void {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screen, params);
  }
}

export function useGoBack(): void {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}
