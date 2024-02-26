import admin from "firebase-admin";
import { getFirestore } from 'firebase-admin/firestore';

import serviceAccount from "./serviceAccount.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount )
});

export default admin;
export const db = getFirestore();
