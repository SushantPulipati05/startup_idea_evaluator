import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIdeaStore } from '../store/useIdeaStore';
import { useTheme } from '../theme';

interface Props {
  title: string;
  subtitle?: string;
}

export default function ScreenHeader({ title, subtitle }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const toggleDarkMode = useIdeaStore((s) => s.toggleDarkMode);

  return (
    <LinearGradient
      colors={theme.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-row items-center rounded-b-[26px] px-5 pb-[22px]"
      style={{ paddingTop: insets.top + 14 }}
    >
      <View className="flex-1">
        <Text className="font-poppins-bold text-2xl text-white">{title}</Text>
        {subtitle ? (
          <Text className="mt-0.5 font-poppins text-[13px] text-white/85">{subtitle}</Text>
        ) : null}
      </View>
      <Pressable
        onPress={toggleDarkMode}
        className="h-10 w-10 items-center justify-center rounded-full bg-white/20 active:opacity-70"
        accessibilityLabel="Toggle dark mode"
        hitSlop={10}
      >
        <Ionicons name={theme.dark ? 'sunny' : 'moon'} size={20} color="#fff" />
      </Pressable>
    </LinearGradient>
  );
}
