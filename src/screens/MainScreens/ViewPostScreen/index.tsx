import React from 'react';
import LoadingDefault from '../../../components/organisms/LoadingDisplay/LoadingDefault';
import LoadingImage from '../../../components/organisms/LoadingDisplay/LoadingImage';
import DefaultLayout from '../../../components/templates/DefaultLayout';
import HTMLRenderer from '../../../components/organisms/HTMLRenderer';
import tw from '../../../styles/tailwind';
import moment from 'moment';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import {useRoute} from '@react-navigation/native';
import {useQuery} from 'convex/react';
import {api} from '../../../../convex/_generated/api';
import {FeatherIcon} from '../../../utils/Icons';

const ViewPostScreen = () => {
  const route: any = useRoute();

  const postId = route.params?.id;

  const post = useQuery(api.post.post, {postId});

  return (
    <DefaultLayout title={post ? post?.title : ''}>
      <ScrollView contentContainerStyle={tw.style('w-full', !post && 'h-full')}>
        <View style={tw`gap-y-3`}>
          <View style={tw`w-full h-[15rem]`}>
            {!post ? (
              <LoadingImage />
            ) : (
              <Image
                style={tw`w-full h-full bg-accent-8`}
                resizeMode="cover"
                source={{
                  uri: `${post?.url}`,
                }}
              />
            )}
          </View>
          {!post ? (
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
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={tw`flex-row items-center gap-x-1`}>
                      <FeatherIcon name="heart" color="#E39400" size={18} />
                      <Text style={tw`font-dosis text-accent-9 text-sm`}>
                        0
                      </Text>
                    </TouchableOpacity>
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
                <Text style={tw`mt-2 font-dosis text-xs text-accent-9`}>
                  {moment(post?._creationTime).format('LL')}
                </Text>
              </View>
              <View style={tw`w-full px-3`}>
                <HTMLRenderer html={String(post?.article)} />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

export default ViewPostScreen;
