import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { fetchJadwalData, filterJadwalByUser } from '../services/api';
import { getUser } from '../storage/userStorage';
import { schedulePiketNotifications } from '../services/notification';
import JadwalCard from '../components/JadwalCard';

const HomeScreen = ({ navigation }) => {
  const [jadwal, setJadwal] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Get user from storage
      const userData = await getUser();
      setUser(userData);

      if (!userData) {
        navigation.replace('SelectUser');
        return;
      }

      // Fetch jadwal data
      const allJadwal = await fetchJadwalData();
      
      // Filter jadwal for current user
      const userJadwal = filterJadwalByUser(allJadwal, userData.name);
      setJadwal(userJadwal);

      // Schedule notifications
      await schedulePiketNotifications(userJadwal);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Memuat jadwal...</Text>
      </View>
    );
  }

  if (jadwal.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>
          Tidak ada jadwal piket untuk {user?.name}
        </Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={loadData}
        >
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Jadwal Piket - {user?.name}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingsText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={jadwal}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <JadwalCard jadwal={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
      />

      <Text style={styles.infoText}>
        Notifikasi akan muncul 24 jam sebelum jadwal piket
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#3498db',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  settingsText: {
    fontSize: 24,
    color: '#fff',
  },
  listContainer: {
    paddingVertical: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 50,
  },
  refreshButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    textAlign: 'center',
    color: '#95a5a6',
    fontSize: 12,
    padding: 10,
    fontStyle: 'italic',
  },
});

export default HomeScreen;