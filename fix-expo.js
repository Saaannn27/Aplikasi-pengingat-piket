// fix-expo.js
const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const problemFolder = path.join(projectRoot, '.expo', 'metro', 'externals', 'node:sea');

// Coba buat folder dengan cara berbeda
try {
  // Method 1: Normal
  fs.mkdirSync(problemFolder, { recursive: true });
  console.log('Folder created successfully');
} catch (err) {
  console.log('Method 1 failed:', err.message);
  
  // Method 2: Dengan nama encoded
  const encodedFolder = path.join(projectRoot, '.expo', 'metro', 'externals', 'node' + encodeURIComponent(':') + 'sea');
  fs.mkdirSync(encodedFolder, { recursive: true });
  console.log('Encoded folder created:', encodedFolder);
  
  // Method 3: Buat symlink
  const validFolder = path.join(projectRoot, '.expo', 'metro', 'externals', 'node_sea');
  fs.mkdirSync(validFolder, { recursive: true });
  
  // Buat symlink (butuh admin di Windows)
  try {
    fs.symlinkSync(validFolder, problemFolder, 'junction');
    console.log('Symlink created');
  } catch (symErr) {
    console.log('Symlink failed (might need admin):', symErr.message);
  }
}

console.log('Fix applied. Now try: npx expo start --clear');