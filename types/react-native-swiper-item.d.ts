declare module 'react-native-swipe-item' {
  interface SwipeProviderProps {
    /**
     * Swipe items mode, default is single
     */

    mode?: 'single' | 'multiple';
    /**
     * The trigger for automatically closed swipe item , default is onItemMoved
     * `onItemMoved` - when the swipe item is moved, the opened one will be closed.
     * `onButtonShowed` - when the swipe item button is showing, the opened one will be closed.
     */
    closeTrigger?: 'onItemMoved' | 'onButtonShowed';
    children: Element; //add code fix error
  }
}
