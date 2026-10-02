import React from 'react';
import { View, Text } from 'react-native';
import { ratingClasses } from '../utils/fakeAI';

export default function RatingBadge({ rating }: { rating: number }) {
  const c = ratingClasses(rating);
  return (
    <View className={`h-[52px] w-[52px] items-center justify-center rounded-full border-[2.5px] ${c.border} ${c.bg}`}>
      <Text className={`-mb-1 font-poppins-bold text-lg ${c.text}`}>{rating}</Text>
      <Text className={`font-poppins-semibold text-[9px] tracking-widest ${c.text}`}>AI</Text>
    </View>
  );
}
