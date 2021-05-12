// Package imports.
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Type imports.
import {
  FirebaseCollection,
  FirebaseDocumentData,
  FirebaseDocumentRef,
  FirebaseDocumentSnapshot,
  FirebaseUser,
  FirebaseUserCredential,
} from '../../typings/firebase';

// Service implementation.
const api = {

  createAuth(
    email : string, password : string,
  ) : Promise<FirebaseUserCredential> {
    return auth().createUserWithEmailAndPassword(email, password);
  },

  currentUser() : FirebaseUser | null {
    return auth().currentUser;
  },

  currentUserDocument() : FirebaseDocumentRef {
    return this.userDocument(this.currentUser()?.uid);
  },

  getReference(
    userRef : FirebaseDocumentRef,
  ) : Promise<FirebaseDocumentSnapshot> {
    return userRef.get();
  },

  getUser(
    userUID : string | undefined,
  ) : Promise<FirebaseDocumentSnapshot> {
    return this.userDocument(userUID).get();
  },

  setDocumentData(
    userUID : string, documentData : FirebaseDocumentData,
  ) : Promise<void> {
    return this.userDocument(userUID).set(documentData);
  },

  signIn(
    email : string, password : string,
  ) : Promise<FirebaseUserCredential> {
    return auth().signInWithEmailAndPassword(email, password);
  },

  signOut() : Promise<void> {
    return auth().signOut();
  },

  userCollection() : FirebaseCollection {
    return firestore().collection('users');
  },

  userDocument(
    userUID : string | undefined,
  ) : FirebaseDocumentRef {
    return this.userCollection().doc(userUID);
  },

};

// Export default.
export default api;
