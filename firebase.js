const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqRSAVJs2ix8Cdi-ZpKXJBBFl8b9GZcMM",
    authDomain: "heyday-1b03a.firebaseapp.com",
    projectId: "heyday-1b03a",
    storageBucket: "heyday-1b03a.appspot.com",
    messagingSenderId: "298114969782",
    appId: "1:298114969782:web:6ebf9cbb2441bcb190f617"
};

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
module.exports = getStorage(firebaseApp);