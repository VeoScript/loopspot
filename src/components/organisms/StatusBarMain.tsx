import React from 'react';
import {StatusBar} from 'react-native';

type BarStyleProps = {
  barStyles: keyof typeof BarStyles;
};

export interface StatusBarMainProps {
  animated: boolean;
  backgroundColor: string;
  barStyle: BarStyleProps['barStyles'];
}

export const BarStyles = {
  default: 'default',
  'dark-content': 'dark-content',
  'light-content': 'light-content',
};

type StatusBarMainComponent = (props: StatusBarMainProps) => JSX.Element;

const StatusBarMain: StatusBarMainComponent = ({
  animated,
  backgroundColor,
  barStyle,
}): JSX.Element => {
  return (
    <StatusBar
      animated={animated}
      backgroundColor={backgroundColor}
      barStyle={BarStyles[barStyle]}
    />
  );
};

export default StatusBarMain;
