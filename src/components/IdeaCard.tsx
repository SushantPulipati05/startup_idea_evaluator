import React, { useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { Idea } from '../types';
import { useIdeaStore } from '../store/useIdeaStore';
import { useTheme } from '../theme';
import { shareIdea, copyIdea } from '../utils/share';
import RatingBadge from './RatingBadge';

interface Props {
  idea: Idea;
  index: number;
  highlighted?: boolean;
}

export default function IdeaCard({ idea, index, highlighted }: Props) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const voted = useIdeaStore((s) => s.votedIds.includes(idea.id));
  const toggleVote = useIdeaStore((s) => s.toggleVote);
  const swipeRef = useRef<SwipeableMethods>(null);
  const canExpand = idea.description.length > 90;

  const scale = useSharedValue(1);
  const popStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handleVote = () => {
    const result = toggleVote(idea.id);
    cancelAnimation(scale);
    scale.value = withSequence(
      withTiming(1.3, { duration: 120 }),
      withTiming(1, { duration: 280, easing: Easing.out(Easing.back(3)) })
    );
    Toast.show({
      type: result === 'voted' ? 'success' : 'info',
      text1: result === 'voted' ? 'Upvoted! 👍' : 'Vote removed',
      text2: idea.name,
      visibilityTime: 1500,
    });
  };

  const renderLeft = () => (
    <View className="flex-1 items-start justify-center rounded-[20px] bg-green-500 px-6">
      <Ionicons name={voted ? 'thumbs-down' : 'thumbs-up'} size={26} color="#fff" />
      <Text className="mt-0.5 font-poppins-semibold text-xs text-white">{voted ? 'Unvote' : 'Upvote'}</Text>
    </View>
  );
  const renderRight = () => (
    <View className="flex-1 items-end justify-center rounded-[20px] bg-brand px-6 dark:bg-brand-dark">
      <Ionicons name="share-social" size={26} color="#fff" />
      <Text className="mt-0.5 font-poppins-semibold text-xs text-white">Share</Text>
    </View>
  );

  return (
    <Animated.View entering={FadeInDown.delay(Math.min(index, 8) * 60).springify()}>
      <View className="mx-4 mb-3.5">
        <ReanimatedSwipeable
          ref={swipeRef}
          friction={2}
          leftThreshold={70}
          rightThreshold={70}
          renderLeftActions={renderLeft}
          renderRightActions={renderRight}
          onSwipeableOpen={(direction) => {
            if (direction === 'right') handleVote();
            else shareIdea(idea);
            swipeRef.current?.close();
          }}
        >
          <View
            className={`rounded-[20px] bg-card p-4 shadow-md shadow-indigo-900/10 dark:bg-card-dark ${
              highlighted
                ? 'border-2 border-brand dark:border-brand-dark'
                : 'border border-line dark:border-line-dark'
            }`}
          >
            <View className="flex-row items-start">
              <View className="flex-1 pr-3">
                {highlighted ? (
                  <Text className="mb-1 self-start overflow-hidden rounded-md bg-soft px-2 py-0.5 font-poppins-semibold text-[10px] text-brand dark:bg-soft-dark dark:text-brand-dark">
                    ✨ JUST SUBMITTED
                  </Text>
                ) : null}
                <Text className="font-poppins-bold text-lg text-ink dark:text-ink-dark">{idea.name}</Text>
                <Text className="mt-0.5 font-poppins-medium text-[13px] text-muted dark:text-muted-dark">
                  {idea.tagline}
                </Text>
              </View>
              <RatingBadge rating={idea.rating} />
            </View>

            <Text className="mt-3 overflow-hidden rounded-xl bg-soft p-2.5 font-poppins-medium text-xs text-brand dark:bg-soft-dark dark:text-brand-dark">
              🤖 {idea.feedback}
            </Text>

            <Text
              className="mt-2.5 font-poppins text-sm leading-[21px] text-ink dark:text-ink-dark"
              numberOfLines={expanded ? undefined : 2}
            >
              {idea.description}
            </Text>
            {canExpand ? (
              <Pressable onPress={() => setExpanded((v) => !v)} hitSlop={8}>
                <Text className="mt-1 font-poppins-semibold text-[13px] text-brand dark:text-brand-dark">
                  {expanded ? 'Show less ▲' : 'Read more ▼'}
                </Text>
              </Pressable>
            ) : null}

            <View className="mt-3 flex-row items-center justify-between border-t border-line pt-3 dark:border-line-dark">
              <Animated.View style={popStyle}>
                <Pressable
                  onPress={handleVote}
                  className={`flex-row items-center gap-1.5 rounded-full px-3.5 py-2 active:opacity-80 ${
                    voted ? 'bg-brand dark:bg-brand-dark' : 'bg-soft dark:bg-soft-dark'
                  }`}
                  accessibilityLabel={voted ? 'Remove upvote' : 'Upvote'}
                >
                  <Ionicons
                    name={voted ? 'thumbs-up' : 'thumbs-up-outline'}
                    size={16}
                    color={voted ? '#fff' : theme.primary}
                  />
                  <Text
                    className={`font-poppins-semibold text-[13px] ${
                      voted ? 'text-white' : 'text-brand dark:text-brand-dark'
                    }`}
                  >
                    {voted ? 'Upvoted' : 'Upvote'} · {idea.votes}
                  </Text>
                </Pressable>
              </Animated.View>

              <View className="flex-row gap-1.5">
                <IconBtn icon="copy-outline" color={theme.subtext} onPress={() => copyIdea(idea)} label="Copy" />
                <IconBtn
                  icon="share-social-outline"
                  color={theme.subtext}
                  onPress={() => shareIdea(idea)}
                  label="Share"
                />
              </View>
            </View>
          </View>
        </ReanimatedSwipeable>
      </View>
    </Animated.View>
  );
}

function IconBtn({
  icon,
  color,
  onPress,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
  label: string;
}) {
  return (
    <Pressable onPress={onPress} hitSlop={6} accessibilityLabel={label} className="p-1.5 active:opacity-50">
      <Ionicons name={icon} size={20} color={color} />
    </Pressable>
  );
}
