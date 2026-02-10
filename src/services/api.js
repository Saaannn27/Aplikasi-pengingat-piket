import { CONFIG } from '../constants/config';

export const fetchJadwalData = async () => {
  try {
    const response = await fetch(CONFIG.JSON_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jadwal data:', error);
    throw error;
  }
};

export const filterJadwalByUser = (jadwalData, userName) => {
  if (!jadwalData || !userName) return [];
  
  return jadwalData.filter(item => 
    item.nama.toLowerCase() === userName.toLowerCase()
  );
};