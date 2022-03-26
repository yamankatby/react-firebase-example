import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../redux/productsSlice";

const firebaseConfig = {
  apiKey: "AIzaSyAIwPj3b5JD9E5rXOWV5DbhS-48pxRWnzA",
  authDomain: "products-5f019.firebaseapp.com",
  projectId: "products-5f019",
  storageBucket: "products-5f019.appspot.com",
  messagingSenderId: "71374956435",
  appId: "1:71374956435:web:bb1e9395eed88f4d902a66",
  measurementId: "G-1EPDVEFWVM",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const productsRef = collection(db, "products");

export const useProductsListener = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return onSnapshot(productsRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data, createdAt: data.createdAt?.toDate() };
      });

      dispatch(setProducts(docs));
    });
  }, [dispatch]);
};
