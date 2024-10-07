import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase-config";
import exp from "constants";

const random_string = (length) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

const upload = async (file) => {
  if (!file) return;
  try {
    const storageRef = ref(storage, `images/${random_string(10)}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          } catch (err) {
            console.log(err);
            reject(err);
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default upload;
