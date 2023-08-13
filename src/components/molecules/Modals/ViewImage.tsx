import React from 'react';
import Modal from 'react-native-modal';
import {Image} from 'react-native';

import tw from '../../../styles/tailwind';
import {viewImageModalStore} from '../../../lib/stores/global';

const ViewImage = (): JSX.Element => {
  const {isVisible, setIsVisible, image, setImage} = viewImageModalStore();

  const onClose = (): void => {
    setImage('');
    setIsVisible(false);
  };

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.5}
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      {image && (
        <Image
          style={tw`w-full h-[75%]`}
          resizeMode="contain"
          source={{
            uri: image,
          }}
        />
      )}
    </Modal>
  );
};

export default ViewImage;
