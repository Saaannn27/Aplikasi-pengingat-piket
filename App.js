import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { requestNotificationPermissions } from './src/services/notification';
import SplashScreen from './src/screens/SplashScreen';
import SelectUserScreen from './src/screens/SelectUserScreen';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Request notification permissions
      await requestNotificationPermissions();
      setAppIsReady(true);
    } catch (error) {
      console.error('Error initializing app:', error);
      setAppIsReady(true);
    }
  };

  if (!appIsReady) {
    return <SplashScreen onFinish={() => setAppIsReady(true)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SelectUser" component={SelectUserScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}