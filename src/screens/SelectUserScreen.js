import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { fetchJadwalData } from '../services/api';
import { saveUser } from '../storage/userStorage';

const SelectUserScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchJadwalData();
      // Extract unique users
      const uniqueUsers = [...new Set(data.map(item => item.nama))];
      setUsers(uniqueUsers);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data user');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = async (userName) => {
    try {
      const success = await saveUser({ name: userName });
      if (success) {
        navigation.replace('Home');
      } else {
        Alert.alert('Error', 'Gagal menyimpan data user');
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Memuat data user...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pilih Identitas Anda</Text>
      <Text style={styles.subtitle}>
        Pilih nama Anda untuk menampilkan jadwal piket yang sesuai
      </Text>

      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userCard}
            onPress={() => handleSelectUser(item)}
          >
            <Text style={styles.userName}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
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
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 30,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  userCard: {
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
  userName: {
    fontSize: 18,
    color: '#2c3e50',
    textAlign: 'center',
  },
});

export default SelectUserScreen;