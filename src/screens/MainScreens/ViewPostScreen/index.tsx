import React, {useEffect, useRef, useState} from 'react';
import LoadingDefault from '../../../components/organisms/LoadingDisplay/LoadingDefault';
import LoadingImage from '../../../components/organisms/LoadingDisplay/LoadingImage';
import DefaultLayout from '../../../components/templates/DefaultLayout';
import ViewImage from '../../../components/molecules/Modals/ViewImage';
import ReactionButton from '../../../components/molecules/Buttons/ReactionButton';
import HTMLRenderer from '../../../components/organisms/HTMLRenderer';
import FastImage from 'react-native-fast-image'
import moment from 'moment';
import tw from '../../../styles/tailwind';
import {FeatherIcon} from '../../../utils/Icons';
import {Toast} from '../../../utils/Toast';
import {ScrollView, View, Text, TouchableOpacity, Alert} from 'react-native';
import {RichEditor} from 'react-native-pell-rich-editor';
import {
  SwipeItem,
  SwipeButtonsContainer,
  SwipeProvider,
} from 'react-native-swipe-item';

import {userStore} from '../../../lib/stores/auth';
import {viewImageModalStore} from '../../../lib/stores/global';
import {useNavigate} from '../../../config/RootNavigation';

import {useRoute} from '@react-navigation/native';
import {useQuery, useMutation} from 'convex/react';
import {api} from '../../../../convex/_generated/api';
import {Id} from '../../../../convex/_generated/dataModel';

interface PostTitleHolderProps {
  postId: string;
  userId: string;
  authorProfile: string | null;
  authorName: string;
  post: {
    _id: Id<'posts'> | undefined;
    _creationTime: number | undefined;
    title: string | undefined;
    description: string | undefined;
    article: string | undefined;
    authorId: string | undefined;
    url: string | null;
  };
}

type PostTitleHolderType = (props: PostTitleHolderProps) => JSX.Element;

const ViewPostScreen = (): JSX.Element => {
  const route: any = useRoute();
  const postId = route.params?.id;

  const {userId} = userStore();
  const {setImage, setIsVisible} = viewImageModalStore();

  const post = useQuery(api.post.post, {postId});
  const postAuthor = useQuery(api.auth.user, {userId: post ? String(post.authorId) : userId});
  const postAuthorProfile = useQuery(api.upload.profilePhoto, {userId: post ? String(post.authorId) : userId});

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
                <FastImage
                  style={tw`w-full h-full bg-accent-8`}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: `${post?.url}`,
                    priority: FastImage.priority.normal,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
          {!post || !postAuthor || !postAuthorProfile ? (
            <LoadingDefault />
          ) : (
            <>
              <View style={tw`flex-1 w-full border-b border-accent-8`}>
                <PostTitleHolder
                  post={post}
                  postId={postId}
                  userId={userId}
                  authorName={postAuthor.name}
                  authorProfile={postAuthorProfile.url}
                />
              </View>
              <View style={tw`w-full`}>
                <HTMLRenderer html={post.article ?? ''} />
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <ViewImage />
    </DefaultLayout>
  );
};

const PostTitleHolder: PostTitleHolderType = ({
  post,
  postId,
  userId,
  authorName,
  authorProfile,
}): JSX.Element => {
  
  const swipeRef = useRef<any>(null);

  const deletePostMutation = useMutation(api.post.deletePost);

  const handleDeletePost = async () => {
    await deletePostMutation({
      postId,
    })
    Toast('Deleted successfully')
    useNavigate('HomeScreen')
  }

  const rightButton: JSX.Element = (
    <>
      {post.authorId === userId && (
        <SwipeButtonsContainer
          style={tw`flex-col items-center w-[10rem] gap-y-1`}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={tw`flex-row items-center justify-center w-[7rem] p-3 rounded-full bg-accent-8`}
            onPress={() => {
              swipeRef.current.close();
              useNavigate('CreatePostScreen', {id: post._id})
            }}>
            <Text style={tw`font-dosis text-sm text-accent-2`}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={tw`flex-row items-center justify-center w-[7rem] p-3 rounded-full bg-red-400`}
            onPress={() => {  
              Alert.alert(
                '',
                'Are you sure you want to delete this post?',
                [
                  {
                    text: 'No',
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    style: 'default',
                    onPress: handleDeletePost,
                  },
                ],
                {
                  cancelable: true,
                },
              );
            }}>
            <Text style={tw`font-dosis text-sm text-accent-1`}>Delete</Text>
          </TouchableOpacity>
        </SwipeButtonsContainer>
      )}
    </>
  );

  return (
    <SwipeProvider>
      <SwipeItem
        ref={swipeRef}
        style={tw`w-full`}
        rightButtons={rightButton}
        disableSwipeIfNoButton={true}>
        <View style={tw`flex-col w-full px-3 pb-3 gap-y-1 bg-accent-3`}>
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
                <FeatherIcon name="message-circle" color="#E39400" size={18} />
                <Text style={tw`font-dosis text-accent-9 text-sm`}>0</Text>
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
              <FastImage
                style={tw`w-[2rem] h-[2rem] rounded-full bg-accent-8`}
                resizeMode={FastImage.resizeMode.cover}
                source={{
                  uri: `${authorProfile}`,
                  priority: FastImage.priority.normal,
                }}
              />
              <Text style={tw`font-dosis text-sm text-accent-2`}>
                {authorName}
              </Text>
            </TouchableOpacity>
            <Text style={tw`font-dosis text-xs text-accent-9`}>
              {moment(post?._creationTime).format('LL')}
            </Text>
          </View>
        </View>
      </SwipeItem>
    </SwipeProvider>
  );
};

export default ViewPostScreen;
