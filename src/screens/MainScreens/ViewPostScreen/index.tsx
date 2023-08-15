import React from 'react';
import LoadingDefault from '../../../components/organisms/LoadingDisplay/LoadingDefault';
import LoadingImage from '../../../components/organisms/LoadingDisplay/LoadingImage';
import DefaultLayout from '../../../components/templates/DefaultLayout';
import ViewImage from '../../../components/molecules/Modals/ViewImage';
import ReactionButton from '../../../components/molecules/Buttons/ReactionButton';
import moment from 'moment';
import tw from '../../../styles/tailwind';
import {FeatherIcon} from '../../../utils/Icons';
import {ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import {RichEditor} from 'react-native-pell-rich-editor';

import {userStore} from '../../../lib/stores/auth';
import {viewImageModalStore} from '../../../lib/stores/global';
import {useNavigate} from '../../../config/RootNavigation';

import {useRoute} from '@react-navigation/native';
import {useQuery} from 'convex/react';
import {api} from '../../../../convex/_generated/api';

const ViewPostScreen = (): JSX.Element => {
  const route: any = useRoute();
  const postId = route.params?.id;

  const {userId} = userStore();
  const {setImage, setIsVisible} = viewImageModalStore();

  const post = useQuery(api.post.post, {postId});
  const postAuthor = useQuery(api.auth.user, {
    userId: post ? String(post.authorId) : userId,
  });
  const postAuthorProfile = useQuery(api.upload.profilePhoto, {
    userId: post ? String(post.authorId) : userId,
  });

  return (
    <DefaultLayout title={post ? post?.title : ''}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw.style('w-full', !post && 'h-full')}>
        <View style={tw`gap-y-3`}>
          <View style={tw`w-full h-[15rem]`}>
            {!post ? (
              <LoadingImage />
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  setImage(String(post?.url));
                  setIsVisible(true);
                }}>
                <Image
                  style={tw`w-full h-full bg-accent-8`}
                  resizeMode="cover"
                  source={{
                    uri: `${post?.url}`,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
          {!post || !postAuthor || !postAuthorProfile ? (
            <LoadingDefault />
          ) : (
            <>
              <View
                style={tw`flex-col w-full px-3 pb-3 gap-y-1 border-b border-accent-8`}>
                <View
                  style={tw`flex-row items-center justify-between w-full gap-x-5`}>
                  <Text style={tw`default-text-color font-dosis-bold text-xl`}>
                    {post?.title}
                  </Text>
                  <View style={tw`flex-row items-center gap-x-2`}>
                    <ReactionButton postId={postId} userId={userId} />
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={tw`flex-row items-center gap-x-1`}>
                      <FeatherIcon
                        name="message-circle"
                        color="#E39400"
                        size={18}
                      />
                      <Text style={tw`font-dosis text-accent-9 text-sm`}>
                        0
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={tw`font-dosis text-sm text-neutral-600`}>
                  {post?.description}
                </Text>
                <View
                  style={tw`flex-row items-center justify-between w-full mt-2 gap-x-3`}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={tw`flex-row items-center gap-x-2`}
                    onPress={() =>
                      useNavigate('ProfileScreen', {userId: post.authorId})
                    }>
                    <Image
                      style={tw`w-[2rem] h-[2rem] rounded-full bg-accent-8`}
                      resizeMode="cover"
                      source={{
                        uri: `${postAuthorProfile?.url}`,
                      }}
                    />
                    <Text style={tw`font-dosis text-sm text-accent-2`}>
                      {postAuthor.name}
                    </Text>
                  </TouchableOpacity>
                  <Text style={tw`font-dosis text-xs text-accent-9`}>
                    {moment(post?._creationTime).format('LL')}
                  </Text>
                </View>
              </View>
              <View style={tw`w-full`}>
                <RichEditor
                  editorStyle={tw`w-full bg-accent-3`}
                  showsVerticalScrollIndicator={false}
                  initialContentHTML={post.article}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <ViewImage />
    </DefaultLayout>
  );
};

export default ViewPostScreen;
