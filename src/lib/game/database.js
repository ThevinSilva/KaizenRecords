import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const IsUsernameExist = async (username) => {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(
    query(collection(db, "leaderboard"), where("username", "==", username))
  );
  return querySnapshot.size > 0;
};

const AddUserInLeaderboard = async (username, score) => {
  const db = getFirestore(app);

  try {
    const isUsernameExist = await IsUsernameExist(username);
    if (isUsernameExist) {
      const querySnapshot = await getDocs(
        query(collection(db, "leaderboard"), where("username", "==", username))
      );
      querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, { score: score });
      });
      return true;
    }
    const docRef = await addDoc(collection(db, "leaderboard"), {
      username: username,
      score: score,
    });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return false;
};

const GetLeaderboard = async () => {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(
    query(collection(db, "leaderboard"), orderBy("score", "desc"), limit(10))
  );
  let leaderboard = [];
  querySnapshot.forEach((doc) => {
    leaderboard.push(doc.data());
  });
  return leaderboard;
};

export { AddUserInLeaderboard, GetLeaderboard, IsUsernameExist };
