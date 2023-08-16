import React, {useState} from 'react';
import DefaultLayout from '../../../components/templates/DefaultLayout';
import LoadingDefault from '../../../components/organisms/LoadingDisplay/LoadingDefault';
import BootSplashScreen from '../../../components/organisms/BootSplashScreen';
import UploadProfile from '../../../components/molecules/Modals/UploadProfile';
import UploadCover from '../../../components/molecules/Modals/UploadCover';
import ViewImage from '../../../components/molecules/Modals/ViewImage';
import PostCard from '../../../components/molecules/Cards/PostCard';
import FollowerHolder from '../../../components/atoms/FollowerHolder';
import FastImage from 'react-native-fast-image'
import tw from '../../../styles/tailwind';
import {FeatherIcon} from '../../../utils/Icons';
import {
  Image,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import {useRoute} from '@react-navigation/native';
import {userStore} from '../../../lib/stores/auth';
import {
  uploadProfileModalStore,
  uploadCoverModalStore,
  viewImageModalStore,
} from '../../../lib/stores/global';

import {useQuery, usePaginatedQuery} from 'convex/react';
import {api} from '../../../../convex/_generated/api';

const ProfileScreen = (): JSX.Element => {
  const route: any = useRoute();
  const userProfileId = route.params?.userId;

  const {userId} = userStore();
  const {setImage, setIsVisible} = viewImageModalStore();
  const {setPhoto: setProfilePhoto, setIsVisible: setIsVisibleUploadProfile} = uploadProfileModalStore();
  const {setPhoto: setCoverPhoto, setIsVisible: setIsVisibleUploadCover} = uploadCoverModalStore();

  const user = useQuery(api.auth.user, {
    userId: userProfileId ? String(userProfileId) : userId,
  });
  const profile = useQuery(api.upload.profilePhoto, {
    userId: userProfileId ? String(userProfileId) : userId,
  });
  const cover = useQuery(api.upload.coverPhoto, {
    userId: userProfileId ? String(userProfileId) : userId,
  });
  const {
    results: posts,
    isLoading,
    loadMore,
  } = usePaginatedQuery(
    api.post.userPosts,
    {
      userId: userProfileId ? String(userProfileId) : userId,
    },
    {
      initialNumItems: 5,
    },
  );

  if (!user || !profile || !cover) return <BootSplashScreen />;

  const handleChooseProfilePhoto = (): void => {
    let options: any = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setProfilePhoto(null);
        setIsVisibleUploadProfile(false);
        return;
      }
      if (response) {
        setProfilePhoto(response?.assets);
        setIsVisibleUploadProfile(true);
      }
    });
  };

  const handleChooseCoverPhoto = (): void => {
    let options: any = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setCoverPhoto(null);
        setIsVisibleUploadCover(false);
        return;
      }
      if (response) {
        setCoverPhoto(response?.assets);
        setIsVisibleUploadCover(true);
      }
    });
  };

  const itemKeyExtractor = (
    item: any,
    index: {toString: () => any},
  ): string => {
    return index.toString();
  };

  const renderSpinner: JSX.Element = <ActivityIndicator style={tw`pb-3`} color="#CC8500" size={40} />;

  const listIsEmpty: JSX.Element = (
    <>
      {isLoading ? (
        <LoadingDefault />
      ) : (
        <View
          style={tw`flex-1 flex-col items-center justify-center w-full my-3 p-3`}>
          <Text
            style={tw`uppercase default-text-color font-dosis-bold text-sm text-neutral-500`}>
            No post as of now...
          </Text>
        </View>
      )}
    </>
  );

  const renderHeader: JSX.Element = (
    <>
      <View style={tw`relative flex-row justify-start w-full h-[10rem]`}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw`absolute z-10 right-3 top-3 p-2 rounded-full bg-black bg-opacity-50`}
          onPress={handleChooseCoverPhoto}>
          <FeatherIcon name="camera" color="#FFFFFF" size={18} />
        </TouchableOpacity>
        {cover?.url ? (
          <TouchableOpacity
            activeOpacity={0.5}
            style={tw`w-full h-full`}
            onPress={() => {
              setImage(String(cover?.url));
              setIsVisible(true);
            }}>
            <FastImage
              style={tw`w-full h-full bg-accent-8`}
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: `${cover?.url}`,
                priority: FastImage.priority.normal,
              }}
            />
          </TouchableOpacity>
        ) : (
          <View style={tw`w-full h-full bg-accent-8`} />
        )}
        <View style={tw`absolute left-3 -bottom-8`}>
          {profile?.url ? (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setImage(String(profile?.url));
                setIsVisible(true);
              }}>
              <FastImage
                style={tw`w-[9rem] h-[9rem] rounded-full border-2 border-accent-3 bg-accent-8`}
                resizeMode={FastImage.resizeMode.cover}
                source={{
                  uri: `${profile?.url}`,
                  priority: FastImage.priority.normal,
                }}
              />
            </TouchableOpacity>
          ) : (
            <Image
              style={tw`w-[9rem] h-[9rem] rounded-full border-2 border-accent-3 bg-accent-8`}
              resizeMode="cover"
              source={require('../../../assets/images/profile_placeholder.png')}
            />
          )}
          <TouchableOpacity
            activeOpacity={0.5}
            style={tw`absolute z-10 right-3 bottom-1 p-2 rounded-full bg-black bg-opacity-50`}
            onPress={handleChooseProfilePhoto}>
            <FeatherIcon name="camera" color="#FFFFFF" size={18} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`flex-col w-full mt-10`}>
        <View style={tw`flex-col w-full px-3`}>
          <Text style={tw`default-text-color font-dosis-bold text-xl`}>
            {user.name}
          </Text>
          <Text style={tw`default-text-color font-dosis text-sm`}>
            Your bio display here...
          </Text>
        </View>
        <View
          style={tw`flex-row items-center justify-between w-full px-3 py-3 border-b border-accent-8`}>
          <FollowerHolder />
          <TouchableOpacity
            activeOpacity={0.5}
            style={tw`w-auto rounded-xl px-5 py-2 bg-accent-2`}>
            <Text style={tw`font-dosis text-xs text-accent-1`}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )

  const renderData = ({item}: any): JSX.Element => {
    const {_id, title, description, storageId} = item;
    return (
      <PostCard
        id={_id}
        title={title}
        description={description}
        storageId={storageId}
      />
    );
  };

  return (
    <DefaultLayout title={user.name}>
      <FlatList
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={listIsEmpty}
        ListHeaderComponent={renderHeader}
        data={!posts ? [] : posts}
        keyExtractor={itemKeyExtractor}
        renderItem={renderData}
        onEndReached={() => loadMore(5)}
        ListFooterComponent={
          isLoading && posts.length != 0 ? renderSpinner : null
        }
      />
      <UploadProfile
        authorId={profile.authorId}
        profileId={profile._id}
        previousStorageId={String(profile.storageId)}
      />
      <UploadCover
        authorId={cover.authorId}
        coverId={cover._id}
        previousStorageId={String(cover.storageId)}
      />
      <ViewImage />
    </DefaultLayout>
  );
};

export default ProfileScreen;
