// Package imports.
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Package provided type imports.
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

// Context imports.
import { useAuthContext } from '../../contexts/auth';

// Service implementation.
const api = {

  createAuth(
    email : string, password : string,
  ) : Promise<FirebaseAuthTypes.UserCredential> {
    return auth().createUserWithEmailAndPassword(email, password);
  },

  currentUser() : FirebaseAuthTypes.User | null {
    const authContext = useAuthContext();
    return authContext.currentUser;
  },

  currentUserDocument() : FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData> {
    return this.userDocument(this.currentUser()?.uid);
  },

  currentUserResolved() : Promise<FirebaseAuthTypes.User | null> {
    const authContext = useAuthContext();
    return new Promise((resolve) => {
      setTimeout(() => {
        while (authContext.loadingCurrentUser);
        resolve(authContext.currentUser);
      }, 1000);
    });
  },

  getReference(
    userRef : FirebaseFirestoreTypes.DocumentReference,
  ) : Promise<FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>> {
    return userRef.get();
  },

  getUser(
    userUID : string | undefined,
  ) : Promise<FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>> {
    return this.userDocument(userUID).get();
  },

  setDocumentData(
    userUID : string, documentData : FirebaseFirestoreTypes.DocumentData,
  ) : Promise<void> {
    return this.userDocument(userUID).set(documentData);
  },

  signIn(
    email : string, password : string,
  ) : Promise<FirebaseAuthTypes.UserCredential> {
    return auth().signInWithEmailAndPassword(email, password);
  },

  signOut() : Promise<void> {
    return auth().signOut();
  },

  userCollection() : FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData> {
    return firestore().collection('users');
  },

  userDocument(
    userUID : string | undefined,
  ) : FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData> {
    return this.userCollection().doc(userUID);
  },

};

// Export default.
export default api;
