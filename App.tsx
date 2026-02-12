import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { tokens } from './src/styles/tokens';
import { useAuthStore } from './src/stores/authStore';

// Screens
import { AuthScreen } from './src/screens/AuthScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { BatchScreen } from './src/screens/BatchScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { MeditationScreen } from './src/screens/MeditationScreen';
import { BreathScreen } from './src/screens/BreathScreen';
import { PhilosophyScreen } from './src/screens/PhilosophyScreen';
import { NexusScreen } from './src/screens/NexusScreen';
import { ForbiddenScreen } from './src/screens/ForbiddenScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const { isAuthenticated, isLoading, loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  if (isLoading) {
    return null; // Or loading screen
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={tokens.colors.obsidian} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: tokens.colors.obsidian,
            },
            headerTintColor: tokens.colors.alabaster,
            headerTitleStyle: {
              fontWeight: '700',
            },
            contentStyle: {
              backgroundColor: tokens.colors.obsidian,
            },
          }}
        >
          {!isAuthenticated ? (
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: '🧠 Cognigos' }}
              />
              <Stack.Screen
                name="Batch"
                component={BatchScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profile' }}
              />
              <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: 'Settings' }}
              />
              <Stack.Screen
                name="Meditation"
                component={MeditationScreen}
                options={{ title: 'The Refuge' }}
              />
              <Stack.Screen
                name="Breath"
                component={BreathScreen}
                options={{ title: 'Breath Engine' }}
              />
              <Stack.Screen
                name="Philosophy"
                component={PhilosophyScreen}
                options={{ title: 'Philosophy Tracks' }}
              />
              <Stack.Screen
                name="Nexus"
                component={NexusScreen}
                options={{ title: 'The Nexus' }}
              />
              <Stack.Screen
                name="Forbidden"
                component={ForbiddenScreen}
                options={{ title: 'Forbidden Library' }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
