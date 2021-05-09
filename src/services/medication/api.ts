// Package imports.
import firestore from '@react-native-firebase/firestore';

// Service imports.
import userAPI from '../user/api';

// Type imports.
import {
  FirebaseCollection,
  FirebaseDocumentRef,
  FirebaseQuerySnapshot,
} from '../../typings/firebase';
import {
  Medication,
  MedicationHistory,
  MedicationHistoryEntry,
} from '../../typings/medication';

// Service implementation.
const api = {

  addEntryToMedicationHistory(
    medicationHistoryUID : string,
    medicationHistoryEntry : MedicationHistoryEntry,
  ) : Promise<void> {
    return new Promise((resolve, reject) => {
      this.medicationHistoryDocument(medicationHistoryUID).get()
        .then((medicationHistory) => {
          const medicationHistoryData = medicationHistory.data();
          if (medicationHistoryData !== undefined) {
            const currentHistory = medicationHistoryData.history;
            const newHistory = currentHistory.push(medicationHistoryEntry);
            resolve(
              this.updateMedicationHistory(
                medicationHistoryUID,
                { history: newHistory },
              ),
            );
          } else {
            reject(
              new Error('No data found for given medication history UID.'),
            );
          }
        })
        .catch((err) => reject(err));
    });
  },

  createMedication(
    medication : Medication,
  ) : Promise<FirebaseDocumentRef> {
    return this.medicationFirebaseCollection().add({
      user: userAPI.currentUserDocument(),
      ...medication,
    });
  },

  createMedicationHistory(
    medicationUID : string,
    medicationHistory : MedicationHistory,
  ) : Promise<FirebaseDocumentRef> {
    return this.medicationFirebaseCollection().add({
      medication: this.medicationDocument(medicationUID),
      ...medicationHistory,
    });
  },

  deleteMedication(medicationUID : string) : Promise<void> {
    return this.medicationDocument(medicationUID).delete();
  },

  deleteMedicationHistory(medicationHistoryUID : string) : Promise<void> {
    return this.medicationHistoryDocument(medicationHistoryUID).delete();
  },

  getMedication(
    medicationUID : string,
  ) : Promise<Medication> {
    return new Promise((resolve, reject) => {
      this.medicationDocument(medicationUID).get()
        .then((medication) => {
          const medicationData = medication.data();
          if (medicationData !== undefined) {
            resolve({
              alarms: medicationData.alarms,
              data: medicationData.data,
              schedule: medicationData.schedule,
              stock: medicationData.stock,
            });
          } else {
            reject(new Error('No data found for given medication UID.'));
          }
        })
        .catch((err) => reject(err));
    });
  },

  getMedicationHistory(
    medicationUID : string,
  ) : Promise<MedicationHistory> {
    return new Promise((resolve, reject) => {
      this.medicationHistoryFirebaseCollection()
        .where('medication', '==', this.medicationDocument(medicationUID))
        .orderBy('datetime', 'desc')
        .get()
        .then(
          (medicationHistoryEntries) => {
            resolve({
              history: medicationHistoryEntries.docs.map(
                (historyEntry) => {
                  const historyEntryData = historyEntry.data();
                  return ({
                    datetime: historyEntryData.datetime.toDate(),
                    medicated: historyEntryData.medicated,
                    quantity: historyEntryData.quantity,
                  });
                },
              ),
            });
          },
        )
        .catch((err) => reject(err));
    });
  },

  getCurrentUserMedications(): Promise<Array<Medication>> {
    return new Promise((resolve, reject) => {
      this.medicationFirebaseCollection()
        .where('user', '==', userAPI.currentUserDocument())
        .get()
        .then((userMedications) => {
          resolve(
            userMedications.docs.map((userMedicationDoc) => {
              const userMedicationDocData = userMedicationDoc.data();

              return ({
                alarms: userMedicationDocData.alarms,
                data: userMedicationDocData.data,
                schedule: userMedicationDocData.schedule,
                stock: userMedicationDocData.stock,
              });
            }),
          );
        })
        .catch((err) => reject(err));
    });
  },

  medicationDocument(medicationUID : string | undefined) : FirebaseDocumentRef {
    return this.medicationFirebaseCollection().doc(medicationUID);
  },

  medicationHistoryDocument(
    medicationHistoryUID : string | undefined,
  ) : FirebaseDocumentRef {
    return this.medicationHistoryFirebaseCollection().doc(medicationHistoryUID);
  },

  medicationFirebaseCollection() : FirebaseCollection {
    return firestore().collection('medications');
  },

  medicationHistoryFirebaseCollection() : FirebaseCollection {
    return firestore().collection('medicationHistory');
  },

  updateMedication(
    medicationUID : string,
    medicationData : Medication,
  ) : Promise<void> {
    return this.medicationDocument(medicationUID).set({
      ...medicationData,
    }, { merge: true });
  },

  updateMedicationHistory(
    medicationHistoryUID : string,
    medicationHistoryData : MedicationHistory,
  ) : Promise<void> {
    return this.medicationHistoryDocument(medicationHistoryUID).set({
      ...medicationHistoryData,
    }, { merge: true });
  },

};

// Export default.
export default api;
