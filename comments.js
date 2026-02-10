import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";

const commentsRef = collection(db, "comments");

export async function addComment(name, text) {
  await addDoc(commentsRef, {
    name,
    text,
    created: serverTimestamp()
  });
}

export function listenComments(callback) {
  const q = query(commentsRef, orderBy("created", "desc"));
  onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(comments);
  });
}