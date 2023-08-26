// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXclEjCY3wNV4w_3N9p_vcD0O9zOJhlPE",
  authDomain: "job-nest-c6632.firebaseapp.com",
  projectId: "job-nest-c6632",
  storageBucket: "job-nest-c6632.appspot.com",
  messagingSenderId: "820734348710",
  appId: "1:820734348710:web:cbc0614ed406956516d367",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error.message);
  }
};
export const signInWithGoogleRedirect = async () => {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.log(error.message);
  }
};

export const createAuthUserWithEmailAndPassword = async (
  email,
  password,
  displayName,
  photoURL
) => {
  if (!email || !password) return;

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, {
    displayName: displayName,
    photoURL: photoURL,
  });

  await sendEmailVerification(userCredential.user);

  return userCredential;
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential;
};

export const createUserDocumentFromAuth = async (userAuth, addtional) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...addtional,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
export const getCompanyUsers = async () => {
  try {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(
      query(usersCollectionRef, where("category", "==", "company"))
    );

    const companyUsers = [];
    querySnapshot.forEach((doc) => {
      companyUsers.push({ id: doc.id, ...doc.data() });
    });

    return companyUsers;
  } catch (error) {
    console.error("Error fetching company users:", error);
    return [];
  }
};

export const getUserDocument = async (userAuth) => {
  if (!userAuth) return null;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    return userData;
  }

  return null;
};

export const postJob = async (userAuth, jobData) => {
  if (!userAuth) return;
  try {
    const jobsCollectionRef = collection(db, "jobs");

    // Add the job data to the "jobs" collection
    const newJobDocRef = await addDoc(jobsCollectionRef, {
      job: jobData,
      company: userAuth,
    });

    return newJobDocRef;
  } catch (error) {
    console.log("Error creating the job", error.message);
    return null;
  }
};

export const getJob = async () => {
  const jobsCollectionRef = collection(db, "jobs");

  try {
    const querySnapshot = await getDocs(jobsCollectionRef);

    const jobs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      job: doc.data().job,
      company: doc.data().company,
    }));

    return jobs;
  } catch (error) {
    console.log("Error fetching jobs", error.message);
    return null;
  }
};
