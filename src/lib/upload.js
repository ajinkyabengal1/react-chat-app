import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();

export const upload = async (file) => {
  const filename = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const storageRef = ref(storage, `images/${filename}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Upload error:", error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};
