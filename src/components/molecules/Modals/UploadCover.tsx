import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {Image, View, Text, TouchableOpacity} from 'react-native';

import tw from '../../../styles/tailwind';
import {Toast} from '../../../utils/Toast';
import {userStore} from '../../../lib/stores/auth';
import {uploadCoverModalStore} from '../../../lib/stores/global';

import {useMutation} from 'convex/react';
import {api} from '../../../../convex/_generated/api';
import {Id} from '../../../../convex/_generated/dataModel';

interface IProps {
  authorId: string | undefined;
  coverId: Id<'covers'> | undefined | any;
}

type UploadCoverProps = (props: IProps) => JSX.Element;

const UploadCover: UploadCoverProps = ({
  authorId,
  coverId,
}): JSX.Element => {
  const {userId} = userStore();
  const {photo, setPhoto, isVisible, setIsVisible} = uploadCoverModalStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateUploadUrl = useMutation(api.upload.generateUploadUrl);
  const sendCoverImage = useMutation(api.upload.sendCoverImage);
  const updateCoverImage = useMutation(api.upload.updateCoverImage);

  const onClose = (): void => {
    if (!isLoading) {
      setIsVisible(false);
      setPhoto(null);
    }
  };

  const handleUploadPhoto = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const image: any = photo[0];

      // Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl();

      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: 'POST',
        body: image,
      });

      const json = await result.json();

      if (!result.ok) {
        Toast(`Upload failed: ${JSON.stringify(json)}`);
        setIsLoading(false);
      }

      const {storageId} = json;

      // Step 3: Save the newly allocated storage id to the database
      if (userId === authorId) {
        await updateCoverImage({coverId, storageId});
      } else {
        await sendCoverImage({storageId, authorId: userId});
      }

      setIsLoading(false);
      setPhoto(null);
      setIsVisible(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.5}
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View
        style={tw`flex-col items-center w-full p-5 gap-y-5 rounded-xl overflow-hidden bg-accent-3`}>
        <View style={tw`flex-row items-center w-full`}>
          <Text style={tw`default-text-color font-dosis-bold text-base`}>
            Update cover photo
          </Text>
        </View>
        <View>
          {photo && (
            <Image
              style={tw`rounded-xl w-[18rem] h-[8rem] bg-accent-8`}
              resizeMode="cover"
              source={{
                uri: `${photo[0].uri}`,
              }}
            />
          )}
        </View>
        <View style={tw`flex-col items-center w-full`}>
          <Text style={tw`default-text-color font-dosis text-xs`}>This will be the actual size of your cover photo.</Text>
        </View>
        <View style={tw`flex-row items-center w-full gap-x-1`}>
          <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.5}
            style={tw.style(
              'flex-1 items-center w-full px-3 py-2 rounded-xl bg-accent-2',
              isLoading && 'opacity-50',
            )}
            onPress={handleUploadPhoto}>
            <Text style={tw`font-dosis text-sm text-accent-1`}>
              {isLoading ? 'Uploading...' : 'Upload'}
            </Text>
          </TouchableOpacity>
          {!isLoading && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`flex-1 items-center w-full px-3 py-2 rounded-xl bg-accent-8`}
              onPress={onClose}>
              <Text style={tw`font-dosis text-sm text-accent-2`}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default UploadCover;
