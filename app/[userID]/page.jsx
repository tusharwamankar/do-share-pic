"use client";

import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import app from "../Shared/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import UserInfo from "./../components/UserInfo";
import PinList from "./../components/pins/PinList";

function Profile({ params }) {
  const db = getFirestore(app);
  const [userInfo, setUserInfo] = useState();
  const [listOfPins, setlistOfPins] = useState([]);

  useEffect(() => {
    // console.log(params.userID.replace("%40", "@"));
    if (params) {
      getUserInfo(params.userID.replace("%40", "@"));
    }
  }, [params]);

  const getUserInfo = async (email) => {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserInfo(docSnap.data());
    } else {
      // console.log("No such document!");
    }
  };
  useEffect(() => {
    // console.log(userInfo?.userName);
    // console.log(userInfo.email);
    if (userInfo) {
      getUserPins();
    }
  }, [userInfo]);

  const getUserPins = async () => {
    const q = query(
      collection(db, "doShare-post"),
      where("email", "==", userInfo.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      setlistOfPins((listOfPins) => [...listOfPins, doc.data()]);
    });
  };

  return (
    <div>
      {userInfo ? (
        <div className="">
          <UserInfo userInfo={userInfo} />
          <PinList listOfPins={listOfPins} />
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
