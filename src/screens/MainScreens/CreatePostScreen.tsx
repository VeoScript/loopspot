import React, {useRef, useState} from 'react';
import DefaultLayout from '../../components/templates/DefaultLayout';
import tw from '../../styles/tailwind';
import {FeatherIcon} from '../../utils/Icons';
import {Toast} from '../../utils/Toast';
import {ScrollView, View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

import {userStore} from '../../lib/stores/auth';
import {useBackHandler} from '../../lib/hooks/useBackHandler';
import {useNavigate} from '../../config/RootNavigation';

import {useMutation} from 'convex/react';
import {api} from '../../../convex/_generated/api';

const CreatePostScreen = (): JSX.Element => {
  const {userId} = userStore();

  const richText = useRef<any>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [photo, setPhoto] = useState<any>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [descHTML, setDescHTML] = useState<string>('');

  const generateUploadUrl = useMutation(api.upload.generateUploadUrl);
  const createPostMutation = useMutation(api.post.createPost);

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
      setDescHTML(descriptionText);
    } else {
      setDescHTML('');
    }
  };

  const submitContentHandle = async (): Promise<void> => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, '').trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, '').trim();

    if (photo === null) return Toast('Image is required.');
    if (title.trim() === '') return Toast('Title is required.');
    if (description.trim() === '') return Toast('Description is required.');
    if (replaceWhiteSpace.length <= 0) return Toast('Article is required.');

    setIsLoading(true);

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

    await createPostMutation({
      title,
      description,
      article: descHTML,
      authorId: userId,
      storageId,
    });

    setIsLoading(false);
    useNavigate('HomeScreen');
  };

  useBackHandler(() => {
    useNavigate('HomeScreen');
  });

  const handleHead1 = () => <Text style={tw`text-accent-2 text-base`}>H1</Text>;
  const handleHead2 = () => <Text style={tw`text-accent-2 text-base`}>H2</Text>;
  const handleHead3 = () => <Text style={tw`text-accent-2 text-base`}>H3</Text>;

  return (
    <DefaultLayout title="Create Post">
      <ScrollView showsVerticalScrollIndicator={false} style={tw`flex-col w-full h-full`}>
        <View style={tw`relative flex-col items-center w-full`}>
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
            placeholder='Write your title...'
            placeholderTextColor="#A5A5A5"
            value={title}
            onChangeText={value => setTitle(value)}/>
          <TextInput
            style={tw`flex-row items-center justify-center w-full p-3 font-serif text-sm text-accent-2 border-b border-neutral-300 bg-accent-1`}
            multiline
            placeholder='Write your description...'
            placeholderTextColor="#A5A5A5"
            value={description}
            onChangeText={value => setDescription(value)}/>
          <View style={tw`flex-col w-full`}>
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
              onChange={richTextHandle}
              placeholder="Write your cool idea, article or everthing..."
              editorStyle={tw`w-full`}
              initialHeight={250}
            />
          </View>
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
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

export default CreatePostScreen;
