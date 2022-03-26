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

const productsRef = collection(db, "products");

export const useProductsLister = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    return onSnapshot(productsRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data, createdAt: data.createdAt?.toDate() };
      });
      setProducts(docs);
    });
  }, []);

  return products;
};

export const deleteProduct = (id) => {
  deleteDoc(doc(db, "products", id));
};

export const addProduct = () => {
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  addDoc(productsRef, {
    name: "iPhone",
    description: "Lorem ipsum",
    price: 2002,
    uid,
  });
};
