"use client";
import React, { useState } from "react";
import UploadImage from "./../components/UploadImage";
import UserTag from "./../components/UserTag";
import { useSession } from "next-auth/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../Shared/firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";

function Form() {
  const { data: session } = useSession();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [link, setLink] = useState();
  const [file, setFile] = useState();

  const storage = getStorage(app);
  const db = getFirestore(app);
  const postID = Date.now().toString();

  const onSave = () => {
    console.log("title:", title, "desc:", desc, "link:", link);
    console.log("file", file);
    uploadFile();
  };

  const uploadFile = () => {
    const storageRef = ref(storage, "doShare/" + file.name);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a file");
      })
      .then((res) => {
        getDownloadURL(storageRef).then(async (url) => {
          console.log(url);
          const postData = {
            title: title,
            desc: desc,
            link: link,
            image: url,
            userName: session.user.name,
            email: session.user.email,
            userImage: session.user.image,
            id: postID,
          };
          await setDoc(doc(db, "doShare-post", postID), postData).then(
            (res) => {
              console.log("saved bro");
            }
          );
        });
      });
  };

  return (
    <div className="bg-white p-6 rounded-2xl">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => onSave()}
          className="bg-red-500 p-2 text-white font-semibold px-3 rounded-lg"
        >
          Save
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <UploadImage setFile={(file) => setFile(file)} />
        <div className="col-span-2">
          <div className="w-[100%">
            <input
              type="text"
              placeholder="Add a title"
              onChange={(e) => setTitle(e.target.value)}
              className="text-[35px] outline-none font-bold w-full border-b-2 border-gray-400  placeholder-gray-400 "
            />
            <h2 className="text-[12px] w-full text-gray-400 ">
              first 40 words{" "}
            </h2>
            <UserTag />
            <textarea
              type="text"
              placeholder="what pin is about"
              onChange={(e) => setDesc(e.target.value)}
              className="outline-none w-full mt-8 pb-4 text-[14px] border-b-4 border-gray-400  placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Add a Destination link"
              onChange={(e) => setLink(e.target.value)}
              className="outline-none w-full pb-4 mt-[100px]  border-b-2 border-gray-400  placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
