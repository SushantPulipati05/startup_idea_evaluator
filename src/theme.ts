import { cssInterop } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useIdeaStore } from './store/useIdeaStore';

cssInterop(LinearGradient, { className: 'style' });
cssInterop(GestureHandlerRootView, { className: 'style' });

const light = {
  dark: false,
  background: '#F5F6FB',
  card: '#FFFFFF',
  text: '#11142D',
  subtext: '#6B7085',
  border: '#E4E6F0',
  primary: '#6C5CE7',
  gradient: ['#6C5CE7', '#A66CFF'] as readonly [string, string],
};

const dark: typeof light = {
  dark: true,
  background: '#0E0F1A',
  card: '#1A1C2C',
  text: '#F2F3FA',
  subtext: '#9A9DB5',
  border: '#2A2D42',
  primary: '#8B7CFF',
  gradient: ['#4B3FBF', '#8B5CF6'] as readonly [string, string],
};

export type Theme = typeof light;

export function useTheme(): Theme {
  const darkMode = useIdeaStore((s) => s.darkMode);
  return darkMode ? dark : light;
}
