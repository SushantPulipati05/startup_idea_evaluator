import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInRight } from 'react-native-reanimated';
import ScreenHeader from '../components/ScreenHeader';
import { useIdeaStore } from '../store/useIdeaStore';
import { useTheme } from '../theme';
import { SortKey } from '../types';
import { shareIdea } from '../utils/share';

const MEDALS = ['🥇', '🥈', '🥉'];
const PODIUM_GRADIENTS = [
  ['#F7C948', '#F59E0B'],
  ['#CBD5E1', '#94A3B8'],
  ['#E8A27A', '#C2703D'],
] as const;
const PODIUM_SHADOWS = ['shadow-amber-500/40', 'shadow-slate-400/40', 'shadow-orange-700/40'];

export default function LeaderboardScreen() {
  const theme = useTheme();
  const ideas = useIdeaStore((s) => s.ideas);
  const [metric, setMetric] = useState<SortKey>('votes');

  const top5 = useMemo(
    () =>
      [...ideas]
        .sort((a, b) =>
          metric === 'votes' ? b.votes - a.votes || b.rating - a.rating : b.rating - a.rating || b.votes - a.votes
        )
        .slice(0, 5),
    [ideas, metric]
  );

  return (
    <View className="flex-1 bg-surface dark:bg-surface-dark">
      <ScreenHeader title="Leaderboard 🏆" subtitle="Top 5 ideas right now" />

      <View className="m-4 flex-row rounded-2xl border border-line bg-card p-1 dark:border-line-dark dark:bg-card-dark">
        {(['votes', 'rating'] as SortKey[]).map((m) => {
          const active = metric === m;
          const label = m === 'votes' ? '👍 By Votes' : '🤖 By AI Rating';
          return (
            <Pressable key={m} onPress={() => setMetric(m)} className="flex-1">
              {active ? (
                <LinearGradient
                  colors={theme.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="items-center rounded-xl py-2.5"
                >
                  <Text className="font-poppins-semibold text-[13px] text-white">{label}</Text>
                </LinearGradient>
              ) : (
                <View className="items-center rounded-xl py-2.5">
                  <Text className="font-poppins-semibold text-[13px] text-muted dark:text-muted-dark">{label}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      <ScrollView contentContainerClassName="px-4 pt-1 pb-8">
        {top5.map((idea, i) => {
          const isPodium = i < 3;
          const score = metric === 'votes' ? `${idea.votes}` : `${idea.rating}`;
          const unit = metric === 'votes' ? 'votes' : '/100';

          const titleCls = isPodium ? 'text-podium' : 'text-ink dark:text-ink-dark';
          const subCls = isPodium ? 'text-podium/75' : 'text-muted dark:text-muted-dark';
          const scoreCls = isPodium ? 'text-podium' : 'text-brand dark:text-brand-dark';

          const body = (
            <View className="flex-row items-center gap-3">
              <Text
                className={`w-11 text-center font-poppins-bold ${isPodium ? 'text-[32px]' : 'text-xl text-muted-dark'}`}
              >
                {isPodium ? MEDALS[i] : `#${i + 1}`}
              </Text>
              <View className="flex-1">
                <Text className={`font-poppins-bold text-[17px] ${titleCls}`} numberOfLines={1}>
                  {idea.name}
                </Text>
                <Text className={`font-poppins text-xs ${subCls}`} numberOfLines={1}>
                  {idea.tagline}
                </Text>
                <Text className={`mt-1 font-poppins-medium text-[11px] ${subCls}`}>
                  {metric === 'votes' ? `🤖 AI ${idea.rating}/100` : `👍 ${idea.votes} votes`}
                </Text>
              </View>
              <View className="items-end">
                <Text className={`font-poppins-bold text-[26px] ${scoreCls}`}>{score}</Text>
                <Text className={`-mt-1.5 font-poppins-medium text-[11px] ${subCls}`}>{unit}</Text>
              </View>
            </View>
          );

          return (
            <Animated.View key={`${metric}-${idea.id}`} entering={FadeInRight.delay(i * 90).springify()}>
              <Pressable
                onLongPress={() => shareIdea(idea)}
                className={`mb-3.5 rounded-[20px] shadow-lg ${isPodium ? PODIUM_SHADOWS[i] : 'shadow-indigo-900/10'}`}
              >
                {isPodium ? (
                  <LinearGradient
                    colors={PODIUM_GRADIENTS[i]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className={`rounded-[20px] px-4 ${i === 0 ? 'py-[22px]' : 'py-4'}`}
                  >
                    {body}
                  </LinearGradient>
                ) : (
                  <View className="rounded-[20px] border border-line bg-card p-4 dark:border-line-dark dark:bg-card-dark">
                    {body}
                  </View>
                )}
              </Pressable>
            </Animated.View>
          );
        })}

        <Text className="mt-2 text-center font-poppins text-xs text-muted dark:text-muted-dark">
          {top5.length === 0 ? 'No ideas yet — submit one to claim the 🥇!' : 'Long-press a card to share it.'}
        </Text>
      </ScrollView>
    </View>
  );
}
