/**
 * FIREBASE DATA BACKUP UTILITY
 * 
 * This script can be used to backup your Firebase watchlist data to localStorage
 * or to download as a JSON file.
 * 
 * To use: Open your browser console on the dashboard page and paste this entire script.
 * Then call the appropriate function:
 * 
 * - backupToLocalStorage() - Saves your watchlist to browser's localStorage
 * - restoreFromLocalStorage() - Restores your watchlist from localStorage backup
 * - downloadBackup() - Downloads your watchlist as a JSON file
 * - uploadBackup() - Restores from a previously downloaded backup file
 */

// Backup watchlist data to localStorage
function backupToLocalStorage() {
  if (!firebase || !firebase.auth().currentUser) {
    console.error("You must be logged in to backup data");
    return;
  }
  
  const uid = firebase.auth().currentUser.uid;
  const moviesRef = firebase.database().ref(`users/${uid}/movies`);
  
  moviesRef.once('value').then(snapshot => {
    const data = snapshot.val();
    if (!data) {
      console.warn("No movie data found to backup");
      return;
    }
    
    localStorage.setItem('watchlist_backup', JSON.stringify(data));
    console.log("Backup successful! Movies saved to localStorage");
  }).catch(error => {
    console.error("Backup failed:", error);
  });
}

// Restore watchlist data from localStorage
function restoreFromLocalStorage() {
  if (!firebase || !firebase.auth().currentUser) {
    console.error("You must be logged in to restore data");
    return;
  }
  
  const backupData = localStorage.getItem('watchlist_backup');
  if (!backupData) {
    console.error("No backup found in localStorage");
    return;
  }
  
  if (!confirm("This will override your current watchlist with the backup data. Continue?")) {
    return;
  }
  
  try {
    const data = JSON.parse(backupData);
    const uid = firebase.auth().currentUser.uid;
    const moviesRef = firebase.database().ref(`users/${uid}/movies`);
    
    moviesRef.set(data).then(() => {
      console.log("Watchlist restored successfully!");
      location.reload(); // Refresh to see changes
    }).catch(error => {
      console.error("Failed to restore data:", error);
    });
  } catch (error) {
    console.error("Failed to parse backup data:", error);
  }
}

// Download watchlist as a JSON file
function downloadBackup() {
  if (!firebase || !firebase.auth().currentUser) {
    console.error("You must be logged in to download data");
    return;
  }
  
  const uid = firebase.auth().currentUser.uid;
  const moviesRef = firebase.database().ref(`users/${uid}/movies`);
  
  moviesRef.once('value').then(snapshot => {
    const data = snapshot.val();
    if (!data) {
      console.warn("No movie data found to download");
      return;
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `watchlist_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log("Backup downloaded successfully!");
  }).catch(error => {
    console.error("Download failed:", error);
  });
}

// Utility to upload and restore from a backup file
function uploadBackup() {
  if (!firebase || !firebase.auth().currentUser) {
    console.error("You must be logged in to restore data");
    return;
  }
  
  // Create a file input element
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);
  
  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);
        
        if (!confirm("This will override your current watchlist with the backup data. Continue?")) {
          return;
        }
        
        const uid = firebase.auth().currentUser.uid;
        const moviesRef = firebase.database().ref(`users/${uid}/movies`);
        
        moviesRef.set(data).then(() => {
          console.log("Watchlist restored successfully from file!");
          location.reload(); // Refresh to see changes
        }).catch(error => {
          console.error("Failed to restore data:", error);
        });
      } catch (error) {
        console.error("Failed to parse backup file:", error);
      }
    };
    reader.readAsText(file);
  });
  
  fileInput.click();
  
  // Clean up the file input after use
  setTimeout(() => {
    document.body.removeChild(fileInput);
  }, 5000);
}

console.log("Backup utility loaded! Available commands:");
console.log("- backupToLocalStorage() - Save your watchlist to localStorage");
console.log("- restoreFromLocalStorage() - Restore from localStorage backup");
console.log("- downloadBackup() - Download your watchlist as a JSON file");
console.log("- uploadBackup() - Restore from a previously downloaded backup file");