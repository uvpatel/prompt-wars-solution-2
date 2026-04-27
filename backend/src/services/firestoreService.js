import { getFirestore } from "../config/firebase.js";

export async function saveInteraction(doc) {
  const db = getFirestore();
  if (!db) return;

  await db.collection("interactions").add({
    ...doc,
    createdAt: new Date().toISOString()
  });
}
