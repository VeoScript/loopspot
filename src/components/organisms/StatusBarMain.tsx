import React from 'react';
import {StatusBar} from 'react-native';

type BarStylesType = 'default' | 'dark-content' | 'light-content';

export const BarStyles: Record<BarStylesType, BarStylesType> = {
  default: 'default',
  'dark-content': 'dark-content',
  'light-content': 'light-content',
};

type BarStyleProps = {
  barStyles: BarStylesType;
};

export interface StatusBarMainProps {
  animated: boolean;
  backgroundColor: string;
  barStyle: BarStyleProps['barStyles'];
}

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
