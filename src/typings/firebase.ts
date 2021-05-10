// Package imports.
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

// Type exports.
export type FirebaseCollection = FirebaseFirestoreTypes.CollectionReference<FirebaseDocumentData>;
export type FirebaseCollectionRef = FirebaseFirestoreTypes.CollectionReference;
export type FirebaseDocumentData = FirebaseFirestoreTypes.DocumentData;
export type FirebaseDocumentRef = FirebaseFirestoreTypes.DocumentReference<FirebaseDocumentData>;
export type FirebaseDocumentSnapshot = FirebaseFirestoreTypes.DocumentSnapshot<FirebaseDocumentData>;
export type FirebaseQuery = FirebaseFirestoreTypes.Query;
export type FirebaseQuerySnapshot = FirebaseFirestoreTypes.QuerySnapshot<FirebaseDocumentData>;
export type FirebaseTimestamp = FirebaseFirestoreTypes.Timestamp;
export type FirebaseUser = FirebaseAuthTypes.User;
export type FirebaseUserCredential = FirebaseAuthTypes.UserCredential;
