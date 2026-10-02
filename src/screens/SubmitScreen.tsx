import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import ScreenHeader from '../components/ScreenHeader';
import { useIdeaStore } from '../store/useIdeaStore';
import { fakeThinkingDelay } from '../utils/fakeAI';
import { useTheme } from '../theme';
import { RootTabParamList } from '../types';

type Props = BottomTabScreenProps<RootTabParamList, 'Submit'>;

const LIMITS = { name: 40, tagline: 80, description: 600 };

export default function SubmitScreen({ navigation }: Props) {
  const theme = useTheme();
  const addIdea = useIdeaStore((s) => s.addIdea);

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = 'Give your startup a name (2+ characters).';
    if (tagline.trim().length < 5) e.tagline = 'Add a catchy tagline (5+ characters).';
    if (description.trim().length < 20) e.description = 'Describe the idea in at least 20 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (loading || !validate()) return;
    setLoading(true);
    await fakeThinkingDelay();
    const idea = addIdea({ name, tagline, description });
    setLoading(false);
    setName('');
    setTagline('');
    setDescription('');
    Toast.show({
      type: 'success',
      text1: `${idea.name} scored ${idea.rating}/100 🤖`,
      text2: idea.feedback,
      visibilityTime: 3500,
    });
    navigation.navigate('Ideas', { highlightId: idea.id });
  };

  const field = (
    key: keyof typeof LIMITS,
    label: string,
    value: string,
    setValue: (v: string) => void,
    placeholder: string,
    multiline = false
  ) => (
    <View className="mb-4">
      <View className="mb-1.5 flex-row justify-between">
        <Text className="font-poppins-semibold text-sm text-ink dark:text-ink-dark">{label}</Text>
        <Text className="font-poppins text-xs text-muted dark:text-muted-dark">
          {value.length}/{LIMITS[key]}
        </Text>
      </View>
      <TextInput
        value={value}
        onChangeText={(t) => {
          setValue(t);
          if (errors[key]) setErrors((e) => ({ ...e, [key]: '' }));
        }}
        placeholder={placeholder}
        placeholderTextColor={theme.subtext}
        maxLength={LIMITS[key]}
        multiline={multiline}
        editable={!loading}
        textAlignVertical={multiline ? 'top' : 'center'}
        className={`rounded-[14px] border-[1.5px] bg-field px-3.5 py-3 font-poppins text-[15px] text-ink dark:bg-field-dark dark:text-ink-dark ${
          multiline ? 'min-h-[130px]' : ''
        } ${errors[key] ? 'border-red-500' : 'border-line dark:border-line-dark'}`}
      />
      {errors[key] ? (
        <Text className="mt-1 font-poppins-medium text-xs text-red-500">{errors[key]}</Text>
      ) : null}
    </View>
  );

  return (
    <View className="flex-1 bg-surface dark:bg-surface-dark">
      <ScreenHeader title="Pitch your idea 💡" subtitle="Our (totally real) AI will rate it" />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerClassName="p-4 pb-10" keyboardShouldPersistTaps="handled">
          <View className="rounded-[20px] border border-line bg-card p-4 dark:border-line-dark dark:bg-card-dark">
            {field('name', 'Startup Name', name, setName, 'e.g. PlantPal')}
            {field('tagline', 'Tagline', tagline, setTagline, 'e.g. Your houseplants, but they text you.')}
            {field(
              'description',
              'Description',
              description,
              setDescription,
              'What problem does it solve? Who is it for? How does it make money?',
              true
            )}
          </View>

          <Pressable onPress={handleSubmit} disabled={loading} className="active:opacity-85">
            <LinearGradient
              colors={theme.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="mt-5 items-center rounded-2xl py-4"
            >
              {loading ? (
                <Animated.View entering={FadeIn} exiting={FadeOut}>
                  <View className="flex-row items-center gap-2.5">
                    <ActivityIndicator color="#fff" />
                    <Text className="font-poppins-semibold text-base text-white">AI is evaluating…</Text>
                  </View>
                </Animated.View>
              ) : (
                <View className="flex-row items-center gap-2.5">
                  <Ionicons name="rocket" size={20} color="#fff" />
                  <Text className="font-poppins-semibold text-base text-white">Submit & get AI rating</Text>
                </View>
              )}
            </LinearGradient>
          </Pressable>

          <Text className="mt-3.5 text-center font-poppins text-xs text-muted dark:text-muted-dark">
            Tip: a detailed description tends to impress the robot. 🤫
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
