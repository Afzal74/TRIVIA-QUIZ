const https = require('https');
const fs = require('fs');
const path = require('path');

const sounds = [
  {
    name: 'background-music.mp3',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    name: 'correct.mp3',
    url: 'https://www.soundjay.com/buttons/sounds/button-09.mp3'
  },
  {
    name: 'wrong.mp3',
    url: 'https://www.soundjay.com/buttons/sounds/button-10.mp3'
  },
  {
    name: 'tick.mp3',
    url: 'https://www.soundjay.com/clock/sounds/clock-ticking-1.mp3'
  },
  {
    name: 'game-start.mp3',
    url: 'https://www.soundjay.com/button/sounds/button-1.mp3'
  },
  {
    name: 'game-end.mp3',
    url: 'https://www.soundjay.com/button/sounds/button-2.mp3'
  },
  {
    name: 'standings.mp3',
    url: 'https://www.soundjay.com/button/sounds/button-3.mp3'
  },
  {
    name: 'congratulations.mp3',
    url: 'https://www.soundjay.com/button/sounds/button-4.mp3'
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
  console.log('Starting download of sound files...');
  
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