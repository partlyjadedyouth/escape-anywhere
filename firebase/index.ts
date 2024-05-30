// Firebase SDK에서 필요한 함수들을 가져옵니다
// 'initializeApp'는 Firebase 앱 인스턴스를 초기화합니다
// 'getApp'은 기존의 Firebase 앱 인스턴스를 가져옵니다
// 'getApps'는 초기화된 모든 Firebase 앱 인스턴스의 배열을 반환합니다
import { initializeApp, getApp, getApps } from "firebase/app";
// 'getFirestore'는 제공된 앱과 연결된 Firestore 서비스를 가져옵니다
import { getFirestore } from "firebase/firestore";
// 'getAuth'는 제공된 앱과 연결된 Auth 서비스를 가져옵니다
import { getAuth } from "firebase/auth";

// Firebase를 위한 설정 객체로 필요한 자격 증명과 식별자를 포함합니다
// 보안상의 이유로 이러한 값들은 .env.local에서 가져옵니다
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Firebase 앱 초기화
// 어떤 Firebase 앱이 이미 초기화되었는지 확인합니다
// 만약 초기화된 앱이 없다면 제공된 설정으로 새로운 앱을 초기화합니다
// 이미 초기화된 앱이 있다면 기존의 앱 인스턴스를 가져옵니다
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 초기화된 Firebase 앱과 연결된 Firestore 인스턴스를 가져옵니다
const db = getFirestore(app);

// 초기화된 Firebase 앱과 연결된 Auth 인스턴스를 가져옵니다
const auth = getAuth(app);

// Firebase 앱 인스턴스, Firestore 인스턴스, Auth 인스턴스를 내보냅니다
// 이를 통해 애플리케이션의 다른 부분에서 이러한 인스턴스들을 사용할 수 있습니다
export { app, db, auth };
