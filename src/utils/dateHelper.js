import { DAYS } from '../constants/config';

// Hitung tanggal untuk trigger notifikasi (H-1)
export const calculateNotificationDate = (hari, jam) => {
  const daysMap = DAYS;
  const today = new Date();
  const todayDay = today.getDay();
  
  const targetDay = daysMap[hari];
  if (targetDay === undefined) return null;
  
  // Parse jam dari string "08:00"
  const [hours, minutes] = jam.split(':').map(Number);
  
  // Hitung hari untuk notifikasi (H-1)
  let daysUntilTarget = targetDay - todayDay;
  if (daysUntilTarget <= 0) {
    daysUntilTarget += 7;
  }
  
  // Notifikasi 1 hari sebelum piket
  const notificationDay = daysUntilTarget - 1;
  
  // Buat tanggal untuk notifikasi
  const notificationDate = new Date(today);
  notificationDate.setDate(today.getDate() + notificationDay);
  notificationDate.setHours(hours, minutes, 0, 0);
  
  // Pastikan notifikasi di masa depan
  if (notificationDate <= today) {
    notificationDate.setDate(notificationDate.getDate() + 7);
  }
  
  return notificationDate;
};

// Format tanggal untuk display
export const formatDate = (date) => {
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};