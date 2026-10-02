import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import IdeaCard from '../components/IdeaCard';
import { useIdeaStore } from '../store/useIdeaStore';
import { useTheme } from '../theme';
import { RootTabParamList, SortKey } from '../types';

type Props = BottomTabScreenProps<RootTabParamList, 'Ideas'>;

const SORTS: { key: SortKey; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'rating', label: 'AI Rating', icon: 'sparkles' },
  { key: 'votes', label: 'Votes', icon: 'thumbs-up' },
];

export default function IdeasScreen({ route, navigation }: Props) {
  const theme = useTheme();
  const ideas = useIdeaStore((s) => s.ideas);
  const [sortBy, setSortBy] = useState<SortKey>('rating');
  const listRef = useRef<FlatList>(null);
  const highlightId = route.params?.highlightId;

  const sorted = useMemo(
    () =>
      [...ideas].sort((a, b) =>
        sortBy === 'rating' ? b.rating - a.rating || b.votes - a.votes : b.votes - a.votes || b.rating - a.rating
      ),
    [ideas, sortBy]
  );

  useEffect(() => {
    if (!highlightId) return;
    const index = sorted.findIndex((i) => i.id === highlightId);
    if (index >= 0) {
      setTimeout(() => listRef.current?.scrollToIndex({ index, animated: true, viewOffset: 12 }), 350);
    }
    const t = setTimeout(() => navigation.setParams({ highlightId: undefined }), 5000);
    return () => clearTimeout(t);
  }, [highlightId]);

  return (
    <View className="flex-1 bg-surface dark:bg-surface-dark">
      <ScreenHeader title="All Ideas 📜" subtitle={`${ideas.length} ideas · swipe → upvote, ← share`} />

      <View className="flex-row items-center gap-2 px-4 py-3.5">
        <Text className="mr-0.5 font-poppins-medium text-[13px] text-muted dark:text-muted-dark">Sort by</Text>
        {SORTS.map((s) => {
          const active = sortBy === s.key;
          return (
            <Pressable
              key={s.key}
              onPress={() => setSortBy(s.key)}
              className={`flex-row items-center gap-1.5 rounded-full border px-3 py-1.5 ${
                active
                  ? 'border-brand bg-brand dark:border-brand-dark dark:bg-brand-dark'
                  : 'border-line bg-card dark:border-line-dark dark:bg-card-dark'
              }`}
            >
              <Ionicons name={s.icon} size={14} color={active ? '#fff' : theme.subtext} />
              <Text
                className={`font-poppins-semibold text-[13px] ${active ? 'text-white' : 'text-ink dark:text-ink-dark'}`}
              >
                {s.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        ref={listRef}
        data={sorted}
        keyExtractor={(i) => i.id}
        renderItem={({ item, index }) => (
          <IdeaCard idea={item} index={index} highlighted={item.id === highlightId} />
        )}
        contentContainerClassName="pb-6"
        onScrollToIndexFailed={({ index }) =>
          setTimeout(() => listRef.current?.scrollToIndex({ index, animated: true }), 300)
        }
        ListEmptyComponent={
          <View className="mt-14 items-center">
            <Text className="text-5xl">🫙</Text>
            <Text className="mt-2 font-poppins-medium text-muted dark:text-muted-dark">
              No ideas yet. Be the first to pitch!
            </Text>
          </View>
        }
      />
    </View>
  );
}
