import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JadwalCard = ({ jadwal }) => {
  if (!jadwal) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.hari}>{jadwal.hari}</Text>
        <Text style={styles.jam}>{jadwal.jam}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.bagian}>Bagian: {jadwal.bagian}</Text>
        <Text style={styles.nama}>Petugas: {jadwal.nama}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  hari: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  jam: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3498db',
  },
  body: {
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 12,
  },
  bagian: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  nama: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
});

export default JadwalCard;