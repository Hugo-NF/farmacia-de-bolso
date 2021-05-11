// Package imports.
import firestore from '@react-native-firebase/firestore';

// Service imports.
import userAPI from '../user/api';

// Type imports.
import {
  FirebaseCollection,
  FirebaseDocumentRef,
} from '../../typings/firebase';
import {
  Medication,
  MedicationHistory,
  MedicationHistoryEntry,
} from '../../typings/medication';

// Service implementation.
const api = {

  createMedication(
    medication : Medication,
  ) : Promise<FirebaseDocumentRef> {
    return this.medicationFirebaseCollection().add({
      user: userAPI.currentUserDocument(),
      ...medication,
    });
  },

  createMedicationHistoryEntry(
    medicationUID : string,
    medicationHistoryEntry : MedicationHistoryEntry,
  ) : Promise<FirebaseDocumentRef> {
    return this.medicationHistoryEntryFirebaseCollection().add({
      medication: this.medicationDocument(medicationUID),
      ...medicationHistoryEntry,
    });
  },

  deleteMedication(medicationUID : string) : Promise<void> {
    return this.medicationDocument(medicationUID).delete();
  },

  deleteMedicationHistoryEntry(
    medicationHistoryEntryUID : string,
  ) : Promise<void> {
    return this.medicationHistoryEntryDocument(medicationHistoryEntryUID)
      .delete();
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
      this.medicationHistoryEntryFirebaseCollection()
        .where('medication', '==', this.medicationDocument(medicationUID))
        .orderBy('datetime', 'desc')
        .get()
        .then(
          (medicationHistoryEntries) => {
            resolve({
              medicationUID,
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

  medicationDocument(medicationUID : string | undefined) : FirebaseDocumentRef {
    return this.medicationFirebaseCollection().doc(medicationUID);
  },

  medicationHistoryEntryDocument(
    medicationHistoryEntryUID : string | undefined,
  ) : FirebaseDocumentRef {
    return this.medicationHistoryEntryFirebaseCollection()
      .doc(medicationHistoryEntryUID);
  },

  medicationFirebaseCollection() : FirebaseCollection {
    return firestore().collection('medications');
  },

  medicationHistoryEntryFirebaseCollection() : FirebaseCollection {
    return firestore().collection('medicationHistoryEntries');
  },

  updateMedication(
    medicationUID : string,
    medicationData : Medication,
  ) : Promise<void> {
    return this.medicationDocument(medicationUID).set({
      ...medicationData,
    }, { merge: true });
  },

  updateMedicationHistoryEntry(
    medicationHistoryEntryUID : string,
    medicationHistoryEntryData : MedicationHistoryEntry,
  ) : Promise<void> {
    return this.medicationHistoryEntryDocument(medicationHistoryEntryUID).set({
      ...medicationHistoryEntryData,
    }, { merge: true });
  },

};

// Export default.
export default api;
