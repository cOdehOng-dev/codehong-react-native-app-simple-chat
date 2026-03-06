import config from "../../firebase.json";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const app = initializeApp(config);
const Auth = getAuth(app);

const uploadImage = async (uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const user = Auth.currentUser;
  const ref = getStorage(app).ref(`/profile/${uid}/photo.png`);
  const snapshot = await ref.put(blob, { contentType: "image/png" });
  blob.close();

  return await snapshot.ref.getDownloadURL();
};

export const login = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(Auth, email, password);
  return user;
};


export const signup = async ({ email, password, name, photoUrl }) => {
  const { user } = await createUserWithEmailAndPassword(Auth, email, password);
  const storageUrl = photoUrl.startWith('http');
  return user;
};


