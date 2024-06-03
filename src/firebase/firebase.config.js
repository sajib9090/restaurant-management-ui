import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAluu07xzQIpsmilDaDAPAhPxGVPKENetc",
  authDomain: "restaurantmanagement-aac4e.firebaseapp.com",
  projectId: "restaurantmanagement-aac4e",
  storageBucket: "restaurantmanagement-aac4e.appspot.com",
  messagingSenderId: "785341873691",
  appId: "1:785341873691:web:840934c9da8741a0bcc2be",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
