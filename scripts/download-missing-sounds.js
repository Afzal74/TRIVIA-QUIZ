const https = require('https');
const fs = require('fs');
const path = require('path');

const sounds = [
  {
    name: 'correct.mp3',
    url: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'
  },
  {
    name: 'wrong.mp3',
    url: 'https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3'
  },
  {
    name: 'congratulations.mp3',
    url: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'
  }
];

const soundsDir = path.join(__dirname, '..', 'public', 'sounds');

// Create sounds directory if it doesn't exist
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

// Function to download a single file
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    
    https.get(url, response => {
      if (response.statusCode === 200) {
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        fs.unlink(filePath, () => {});
        reject(new Error(`Failed to download: Status code ${response.statusCode}`));
      }
    }).on('error', err => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

// Download all files
async function downloadAllSounds() {
  console.log('Starting download of missing sound files...');
  
  for (const sound of sounds) {
    const filePath = path.join(soundsDir, sound.name);
    try {
      await downloadFile(sound.url, filePath);
      console.log(`✅ Downloaded ${sound.name}`);
    } catch (error) {
      console.error(`❌ Error downloading ${sound.name}:`, error.message);
    }
  }
  
  console.log('\nDownload complete!');
}

// Run the download
downloadAllSounds().catch(console.error); 