import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { DAYS } from '../constants/config';
import { calculateNotificationDate } from '../utils/dateHelper';

// Konfigurasi notifikasi
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Request permission untuk notifikasi
export const requestNotificationPermissions = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

// Schedule notifikasi untuk jadwal piket
export const schedulePiketNotifications = async (jadwalUser) => {
  // Cancel semua notifikasi sebelumnya
  await Notifications.cancelAllScheduledNotificationsAsync();

  if (!jadwalUser || jadwalUser.length === 0) return;

  for (const jadwal of jadwalUser) {
    try {
      const triggerDate = calculateNotificationDate(jadwal.hari, jadwal.jam);
      
      if (triggerDate) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: '⏰ Piket Kejari Reminder',
            body: `Besok piket Anda: ${jadwal.hari}, jam ${jadwal.jam} (${jadwal.bagian})`,
            data: { jadwalId: jadwal.id },
            sound: 'default',
          },
          trigger: triggerDate,
        });
        
        console.log(`Notifikasi dijadwalkan untuk ${jadwal.nama}: ${jadwal.hari} ${jadwal.jam}`);
      }
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }
};

// Cancel semua notifikasi
export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};