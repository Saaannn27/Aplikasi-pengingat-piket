import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { removeUser } from '../storage/userStorage';
import { cancelAllNotifications } from '../services/notification';

const SettingsScreen = ({ navigation }) => {
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Apakah Anda yakin ingin logout?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await cancelAllNotifications();
            await removeUser();
            navigation.replace('SelectUser');
          },
        },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'Tentang Aplikasi',
      'Piket Kejari Reminder\n\nAplikasi untuk mengingatkan jadwal piket pegawai Kejaksaan.\n\nData diambil dari file JSON online.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengaturan</Text>

      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Text style={styles.menuText}>🔓 Ganti User / Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleAbout}>
        <Text style={styles.menuText}>ℹ️ Tentang Aplikasi</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Aplikasi Piket Kejari Reminder
        </Text>
        <Text style={styles.footerText}>
          Version 1.0.0
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 30,
    textAlign: 'center',
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#95a5a6',
    textAlign: 'center',
  },
});

export default SettingsScreen;