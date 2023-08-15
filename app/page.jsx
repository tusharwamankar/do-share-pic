"use client";

import React, { useEffect, useState } from "react";
import PinList from "./components/pins/PinList";
import app from "./Shared/firebaseConfig";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import UserInfo from "./components/UserInfo";

export default function Home() {
  const db = getFirestore(app);
  const [listOfPins, setListOfPins] = useState([]);

  useEffect(() => {
    getUserPins();
  }, []);

  const getUserPins = async () => {
    setListOfPins([]);
    const q = query(collection(db, "doShare-post"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setListOfPins((listOfPins) => [...listOfPins, doc.data()]);
    });
  };
  return (
    <>
      <div className="p-3">
        <PinList listOfPins={listOfPins} />
      </div>
    </>
  );
}
