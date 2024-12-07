import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"; // Added missing imports
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB0rPuPi4p3MR139H-XE3JGlp2DVp9Vh3w",
  authDomain: "netflix-clone-25c94.firebaseapp.com",
  projectId: "netflix-clone-25c94",
  storageBucket: "netflix-clone-25c94.appspot.com", // Corrected storageBucket URL
  messagingSenderId: "253992373839",
  appId: "1:253992373839:web:6dc4926976886d05be643a",
  measurementId: "G-721HZ9283J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid, // Added missing comma
      name,
      authProvider: 'local',
      email
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
};


const login = async (email , password)=>{
   try {
     await signInWithEmailAndPassword(auth , email , password)
   } catch (error) {
     console.log(error);
     toast.error(error.code.split('/')[1].split('-').join(' '))
   }
}

const logout = ()=>{

     signOut(auth)
}


export { auth , db , signup , login , logout};
