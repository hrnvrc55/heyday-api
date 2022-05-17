const {ref, deleteObject, getStorage, uploadBytes} = require("firebase/storage");
const storage = require("../firebase");

const uploadFile = (file) => new Promise(async (resolve, reject) => {
    const imageRef = ref(storage, file.originalname);
    const metatype = { contentType: file.mimetype, name: file.originalname };
    await uploadBytes(imageRef, file.buffer, metatype)
        .then((snapshot) => {
            resolve(`https://firebasestorage.googleapis.com/v0/b/heyday-1b03a.appspot.com/o/${file.originalname}?alt=media`)
        })
        .catch((error) => reject({message: error.message}));
});

const uploadFileWithName = (file) => new Promise(async (resolve, reject) => {
    const imageRef = ref(storage, file.name);
    const metatype = { contentType: file.mimetype, name: file.name };
    await uploadBytes(imageRef, file.buffer, metatype)
        .then((snapshot) => {
            resolve(`https://firebasestorage.googleapis.com/v0/b/heyday-1b03a.appspot.com/o/${file.name}?alt=media`)
        })
        .catch((error) => reject({message: error.message}));
});

const deleteFile = (url) => new Promise(async (resolve, reject) => {

    const storage = getStorage();

// Create a reference to the file to delete
    const desertRef = ref(storage, url);

// Delete the file
    deleteObject(desertRef).then(() => {
        // File deleted successfully
        resolve(true);
    }).catch((error) => {
        // Uh-oh, an error occurred!
        reject({message: error.message})
    });
});

module.exports = {
    uploadFile,
    uploadFileWithName,
    deleteFile,
}