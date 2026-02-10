import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const SplashScreenComponent = ({ onFinish }) => {
  useEffect(() => {
    // Simulasi loading resources
    const prepare = async () => {
      try {
        // Fetch data atau inisialisasi di sini
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Sembunyikan splash screen
        await SplashScreen.hideAsync();
        onFinish();
      }
    };

    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Piket Kejari Reminder</Text>
      <ActivityIndicator size="large" color="#3498db" />
      <Text style={styles.subtitle}>Memuat aplikasi...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 20,
    opacity: 0.8,
  },
});

export default SplashScreenComponent;