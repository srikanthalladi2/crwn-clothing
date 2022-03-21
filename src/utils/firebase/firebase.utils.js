import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBGHfcbIoxeQNpnAvnVblkYMRIB_yBIKZ0",
  authDomain: "crwn-clothing-db-5214d.firebaseapp.com",
  projectId: "crwn-clothing-db-5214d",
  storageBucket: "crwn-clothing-db-5214d.appspot.com",
  messagingSenderId: "931763203007",
  appId: "1:931763203007:web:d66f2cd6d835139e038f0a"
};

const fireBaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);