// firestoreUtils.ts
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

const chatCollection = collection(db, "chats");

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: Date;
}

export const saveMessageToFirestore = async (
  message: string,
  sender: string,
) => {
  try {
    await addDoc(chatCollection, {
      message,
      sender,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error saving message to Firestore", error);
  }
};

export const loadMessagesFromFirestore = async (): Promise<ChatMessage[]> => {
  const q = query(chatCollection, orderBy("timestamp", "asc"));
  const querySnapshot = await getDocs(q);
  const messages: ChatMessage[] = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      sender: data.sender,
      message: data.message,
      timestamp: data.timestamp.toDate(), // Firestore Timestamp를 Date 객체로 변환
    };
  });
  return messages;
};
