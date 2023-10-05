// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
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
  updateDoc,
  deleteDoc,
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
initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = async (additional) => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    await createUserDocumentFromAuth(userCredential.user, additional);

    return userCredential;
  } catch (error) {
    console.log(error.message);
  }
};

export const forgetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

export const createAuthUserWithEmailAndPassword = async (
  email,
  password,
  displayName,
  photoURL,
  additional
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

  await createUserDocumentFromAuth(userCredential.user, additional);

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
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        photoURL,
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
      query(
        usersCollectionRef,
        where("category", "==", "company"),
        where("emailVerified", "==", true)
      )
    );

    const companyUsers = [];
    querySnapshot.forEach((doc) => {
      companyUsers.push({ id: doc.id, ...doc.data() });
    });

    return companyUsers;
  } catch (error) {
    console.error("Error fetching verified company users:", error);
    return [];
  }
};
export const getCompanyUserById = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (
      userDocSnapshot.exists() &&
      userDocSnapshot.data().category === "company" &&
      userDocSnapshot.data().emailVerified
    ) {
      return { id: userDocSnapshot.id, ...userDocSnapshot.data() };
    } else {
      console.log("Company user not found or not verified");
      return null;
    }
  } catch (error) {
    console.error("Error fetching company user details:", error);
    return null;
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

export const updateUserDocument = async (userAuth, updatedData) => {
  if (!userAuth) return null;

  const userDocRef = doc(db, "users", userAuth.uid);

  try {
    await setDoc(userDocRef, updatedData, { merge: true });
    return true;
  } catch (error) {
    console.error("Error updating user document:", error);
    return false;
  }
};

export const updateCompanyInJobs = async (email, updatedData) => {
  try {
    const jobsCollectionRef = collection(db, "jobs");
    const q = query(jobsCollectionRef, where("company.email", "==", email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      const docRef = doc.ref;
      const jobData = doc.data();

      jobData.company = { ...jobData.company, ...updatedData };

      await updateDoc(docRef, jobData);
    });

    return true;
  } catch (error) {
    console.error("Error updating company details in Jobs:", error);
    return false;
  }
};

export const postJob = async (userAuth, jobData) => {
  if (!userAuth) return;
  try {
    const jobsCollectionRef = collection(db, "jobs");

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
export const getJobByUserEmail = async (email) => {
  try {
    const jobsCollectionRef = collection(db, "jobs");
    const q = query(jobsCollectionRef, where("company.email", "==", email));
    const querySnapshot = await getDocs(q);

    const jobs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      job: doc.data().job,
      company: doc.data().company,
    }));

    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    return null;
  }
};

export const getJobById = async (jobId) => {
  try {
    const jobDocRef = doc(db, "jobs", jobId);
    const jobDocSnapshot = await getDoc(jobDocRef);

    if (jobDocSnapshot.exists()) {
      return jobDocSnapshot.data();
    } else {
      console.log("Job not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching job details:", error);
    return null;
  }
};
export const deleteJobById = async (jobId) => {
  try {
    const jobDocRef = doc(db, "jobs", jobId);
    const jobDocSnapshot = await getDoc(jobDocRef);

    if (jobDocSnapshot.exists()) {
      await deleteDoc(jobDocRef);
      return true;
    } else {
      console.log("Job not found");
      return false;
    }
  } catch (error) {
    console.error("Error deleting job:", error);
    return false;
  }
};

export const getJobByTitle = async (jobTitle) => {
  const jobsCollectionRef = collection(db, "jobs");

  try {
    const lowercaseJobTitle = jobTitle.toLowerCase();

    const q = query(
      jobsCollectionRef,
      where("job.searchKeywords", "array-contains", lowercaseJobTitle)
    );

    const querySnapshot = await getDocs(q);

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

export const getJobFilter = async (sectionId, optionValue) => {
  try {
    const jobsCollectionRef = collection(db, "jobs");
    const q = query(
      jobsCollectionRef,
      where(`job.${sectionId}`, "==", optionValue)
    );
    const querySnapshot = await getDocs(q);

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
