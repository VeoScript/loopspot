import {useEffect, useState} from 'react';
import tw from '../../../styles/tailwind';
import {OcticonIcon} from '../../../utils/Icons';
import {Text, TouchableOpacity} from 'react-native';

import {useQuery, useMutation} from 'convex/react';
import {api} from '../../../../convex/_generated/api';

export interface ReactionButtonProps {
  postId: string;
  userId: string;
}

type ReactButtonType = (props: ReactionButtonProps) => JSX.Element;

const ReactionButton: ReactButtonType = ({postId, userId}): JSX.Element => {
  const reactions = useQuery(api.reactions.getLikesByPost, {postId});
  const likeMutation = useMutation(api.reactions.like);
  const unlikeMutation = useMutation(api.reactions.unlike);

  const [isLike, setIsLike] = useState<boolean>(false);

  useEffect(() => {
    if (reactions) {
      setIsLike(
        reactions.some((liked: {userId: string}) => liked.userId === userId),
      );
    }
  }, [userId, reactions]);

  const handleLike = async () => {
    await likeMutation({
      postId,
      userId,
    });
  };

  const handleUnlike = async () => {
    await unlikeMutation({
      postId,
      userId,
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={tw`flex-row items-center gap-x-1`}
      onPress={() => {
        setIsLike(!isLike);
        isLike ? handleUnlike() : handleLike();
      }}>
      {isLike ? (
        <OcticonIcon name="heart-fill" color="#E26D5C" size={18} />
      ) : (
        <OcticonIcon name="heart" color="#E39400" size={18} />
      )}
      <Text style={tw`font-dosis text-accent-9 text-sm`}>
        {reactions?.length}
      </Text>
    </TouchableOpacity>
  );
};

export default ReactionButton;
