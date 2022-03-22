import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getAuth, 
        GoogleAuthProvider, 
        signInWithPopup, 
        signInWithRedirect, 
        createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBGHfcbIoxeQNpnAvnVblkYMRIB_yBIKZ0",
  authDomain: "crwn-clothing-db-5214d.firebaseapp.com",
  projectId: "crwn-clothing-db-5214d",
  storageBucket: "crwn-clothing-db-5214d.appspot.com",
  messagingSenderId: "931763203007",
  appId: "1:931763203007:web:d66f2cd6d835139e038f0a"
};

const fireBaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async(userAuth) => {
  if(!userAuth){
    return;
  }
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

if(!userSnapshot.exists()){
  const {displayName, email} = userAuth;
  const createdAt = new Date();

  try{
    await setDoc(userDocRef, {displayName, email, createdAt});
  }

  catch(error){
    console.log('error creating user', error.message);
  }
}
return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || password){
    return;
  }
  return await createAuthUserWithEmailAndPassword(auth, email, password);
};