import React, {useMemo} from 'react';
import RenderHtml from 'react-native-render-html';
import tw from '../../styles/tailwind';
import {useWindowDimensions} from 'react-native';

export interface HTMLRendererProps {
  html: string;
}

type HTMLRendererType = (props: HTMLRendererProps) => JSX.Element;

const HTMLRenderer: HTMLRendererType = ({html}) => {
  const {width} = useWindowDimensions();

  const MemoizedRenderHtml = React.memo(RenderHtml);

  const tagsStyles: any = {
    a: {
      color: '#589DF1',
      textDecorationLine: 'none',
    },
  };

  return (
    <MemoizedRenderHtml
      baseStyle={tw`default-text-color text-base`}
      tagsStyles={tagsStyles}
      contentWidth={width}
      source={{html: html}}
    />
  );
};

export default HTMLRenderer;
