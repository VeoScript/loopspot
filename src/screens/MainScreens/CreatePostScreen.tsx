import React, {useRef, useState, useEffect} from 'react';
import DefaultLayout from '../../components/templates/DefaultLayout';
import tw from '../../styles/tailwind';
import {FeatherIcon} from '../../utils/Icons';
import {Toast} from '../../utils/Toast';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

import {userStore} from '../../lib/stores/auth';
import {useBackHandler} from '../../lib/hooks/useBackHandler';
import {useNavigate} from '../../config/RootNavigation';
import {useRoute} from '@react-navigation/native';

import {useMutation, useQuery} from 'convex/react';
import {api} from '../../../convex/_generated/api';

const CreatePostScreen = (): JSX.Element => {
  const {params}: any = useRoute();

  const {userId} = userStore();

  const editPostId = params?.id ?? '';

  const richText = useRef<any>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [photo, setPhoto] = useState<any>(null);
  const [postImage, setPostImage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [postArticle, setPostArticle] = useState<string>('');
  const [descHTML, setDescHTML] = useState<string>('');

  const postData = useQuery(api.post.post, {postId: editPostId});
  const generateUploadUrl = useMutation(api.upload.generateUploadUrl);
  const createPostMutation = useMutation(api.post.createPost);
  const editPostMutation = useMutation(api.post.editPost);

  useEffect(() => {
    setPostImage(postData?.url ?? '');
    setTitle(postData?.title ?? '');
    setDescription(postData?.description ?? '');
    setPostArticle(postData?.article ?? '');
  }, [postData]);

  const handleChoosePostPhoto = (): void => {
    let options: any = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setPhoto(null);
        return;
      }
      if (response) {
        setPhoto(response?.assets);
      }
    });
  };

  const richTextHandle = (descriptionText: string): void => {
    if (descriptionText) {
      postArticle
        ? setPostArticle(descriptionText)
        : setDescHTML(descriptionText);
    } else {
      setDescHTML('');
    }
  };

  const submitContentHandle = async (): Promise<void> => {
    const replaceHTML = postArticle
      ? postArticle.replace(/<(.|\n)*?>/g, '').trim()
      : descHTML.replace(/<(.|\n)*?>/g, '').trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, '').trim();

    if (photo === null && postImage === '') return Toast('Image is required.');
    if (title.trim() === '') return Toast('Title is required.');
    if (description.trim() === '') return Toast('Description is required.');
    if (replaceWhiteSpace.length <= 0) return Toast('Article is required.');

    setIsLoading(true);

    let getStorageId;

    if (photo) {
      const image: any = photo[0];

      const postUrl = await generateUploadUrl();

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
      getStorageId = storageId;
    }

    if (editPostId) {
      await editPostMutation({
        title,
        description,
        article: postArticle,
        authorId: userId,
        storageId: getStorageId ?? '',
        postId: editPostId,
        postImageUrl: photo ? false : true,
      });

      setIsLoading(false);
      useNavigate('ViewPostScreen', {id: editPostId});
    } else {
      await createPostMutation({
        title,
        description,
        article: descHTML,
        authorId: userId,
        storageId: getStorageId,
      });

      setIsLoading(false);
      useNavigate('HomeScreen');
    }
  };

  useBackHandler(() => {
    useNavigate('HomeScreen');
  });

  const handleHead1 = () => <Text style={tw`text-accent-2 text-base`}>H1</Text>;
  const handleHead2 = () => <Text style={tw`text-accent-2 text-base`}>H2</Text>;
  const handleHead3 = () => <Text style={tw`text-accent-2 text-base`}>H3</Text>;

  return (
    <DefaultLayout title="Create Post">
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`flex-col w-full h-full`}>
        <View style={tw`relative flex-col items-center w-full`}>
          {postImage ? (
            <Image
              style={tw`w-full h-[12rem]`}
              resizeMode="cover"
              source={{
                uri: `${photo ? photo[0].uri : postImage}`,
              }}
            />
          ) : (
            <>
              {photo ? (
                <Image
                  style={tw`w-full h-[12rem]`}
                  resizeMode="cover"
                  source={{
                    uri: `${photo[0].uri}`,
                  }}
                />
              ) : (
                <View
                  style={tw`flex-row items-center justify-center w-full h-[12rem] bg-neutral-100`}>
                  <FeatherIcon name="image" color="#D6D6D6" size={80} />
                </View>
              )}
            </>
          )}
          {!isLoading && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`absolute z-10 right-3 top-3 p-2 rounded-full bg-black bg-opacity-50`}
              onPress={handleChoosePostPhoto}>
              <FeatherIcon name="camera" color="#FFFFFF" size={18} />
            </TouchableOpacity>
          )}
        </View>
        <View style={tw`flex-col w-full`}>
          <TextInput
            style={tw`flex-row items-center justify-center w-full p-3 font-serif text-sm text-accent-2 border-b border-neutral-300 bg-accent-1`}
            placeholder="Write your title..."
            placeholderTextColor="#A5A5A5"
            value={title}
            onChangeText={value => setTitle(value)}
          />
          <TextInput
            style={tw`flex-row items-center justify-center w-full p-3 font-serif text-sm text-accent-2 border-b border-neutral-300 bg-accent-1`}
            multiline
            placeholder="Write your description..."
            placeholderTextColor="#A5A5A5"
            value={description}
            onChangeText={value => setDescription(value)}
          />
          <View style={tw`flex-col w-full bg-accent-1`}>
            <RichToolbar
              style={tw`flex-col items-center w-full`}
              editor={richText}
              selectedIconTint="#873c1e"
              iconTint="#312921"
              iconMap={{
                [actions.heading1]: handleHead1,
                [actions.heading2]: handleHead2,
                [actions.heading3]: handleHead3,
              }}
              actions={[
                actions.heading1,
                actions.heading2,
                actions.heading3,
                actions.setBold,
                actions.setItalic,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.insertLink,
                actions.setStrikethrough,
                actions.setUnderline,
                actions.alignLeft,
                actions.alignCenter,
                actions.alignRight,
                actions.undo,
                actions.redo,
              ]}
            />
            <RichEditor
              ref={richText}
              initialContentHTML={postArticle}
              onChange={richTextHandle}
              placeholder="Write your cool idea, article or everthing..."
              editorStyle={tw`w-full`}
              initialHeight={250}
            />
          </View>
          {editPostId ? (
            <TouchableOpacity
              disabled={isLoading}
              activeOpacity={0.5}
              style={tw.style(
                'flex-row items-center justify-center w-full p-3 bg-accent-2',
                isLoading && 'opacity-50',
              )}
              onPress={submitContentHandle}>
              <Text style={tw`font-dosis text-base text-white`}>
                {isLoading ? 'Updating...' : 'Update Post'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={isLoading}
              activeOpacity={0.5}
              style={tw.style(
                'flex-row items-center justify-center w-full p-3 bg-accent-2',
                isLoading && 'opacity-50',
              )}
              onPress={submitContentHandle}>
              <Text style={tw`font-dosis text-base text-white`}>
                {isLoading ? 'Creating...' : 'Create Post'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

export default CreatePostScreen;
