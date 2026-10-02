import './global.css';
import React, { useLayoutEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import SubmitScreen from './src/screens/SubmitScreen';
import IdeasScreen from './src/screens/IdeasScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import { useIdeaStore } from './src/store/useIdeaStore';
import { colorScheme } from 'nativewind';
import { useTheme } from './src/theme';
import { RootTabParamList } from './src/types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TAB_ICONS: Record<keyof RootTabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
  Submit: ['add-circle', 'add-circle-outline'],
  Ideas: ['list', 'list-outline'],
  Leaderboard: ['trophy', 'trophy-outline'],
};

export default function App() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold });
  const hasHydrated = useIdeaStore((s) => s.hasHydrated);
  const theme = useTheme();
  const darkMode = useIdeaStore((s) => s.darkMode);

  useLayoutEffect(() => {
    colorScheme.set(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  if (!fontsLoaded || !hasHydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-brand">
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }

  const navTheme = theme.dark
    ? { ...DarkTheme, colors: { ...DarkTheme.colors, background: theme.background, card: theme.card, primary: theme.primary } }
    : { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: theme.background, card: theme.card, primary: theme.primary } };

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="light" />
          <Tab.Navigator
            initialRouteName="Submit"
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: theme.primary,
              tabBarInactiveTintColor: theme.subtext,
              tabBarStyle: { backgroundColor: theme.card, borderTopColor: theme.border },
              tabBarLabelStyle: { fontFamily: 'Poppins_500Medium', fontSize: 11 },
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons name={TAB_ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />
              ),
            })}
          >
            <Tab.Screen name="Submit" component={SubmitScreen} />
            <Tab.Screen name="Ideas" component={IdeasScreen} />
            <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
          </Tab.Navigator>
        </NavigationContainer>
        <Toast topOffset={56} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
