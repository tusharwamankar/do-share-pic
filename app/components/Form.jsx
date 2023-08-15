"use client";
import React, { useState } from "react";
import UploadImage from "./../components/UploadImage";
import UserTag from "./../components/UserTag";
import { useSession } from "next-auth/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../Shared/firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Form() {
  const { data: session } = useSession();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [link, setLink] = useState();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const storage = getStorage(app);
  const db = getFirestore(app);
  const postID = Date.now().toString();

  const onSave = () => {
    // console.log("title:", title, "desc:", desc, "link:", link);
    // console.log("file", file);
    setLoading(true);
    uploadFile();
  };

  const uploadFile = () => {
    const storageRef = ref(storage, "doShare/" + file.name);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        // console.log("Uploaded a file");
      })
      .then((res) => {
        getDownloadURL(storageRef).then(async (url) => {
          // console.log(url);
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
              // console.log("saved bro");
              setLoading(true);
              router.push("/" + session.user.email);
            }
          );
        });
      });
  };

  return (
    <div className="bg-white max-w-5xl mx-auto p-6 rounded-2xl text-black">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => onSave()}
          className="bg-gray-500 p-2 text-white font-semibold px-3 rounded-lg"
        >
          {loading ? (
            <Image
              src="/loading.png"
              alt="loading"
              width={30}
              height={30}
              className="animate-spin mx-auto"
              priority
            />
          ) : (
            <span>Save</span>
          )}
        </button>
      </div>
      <div className="flex flex-col justify-center gap-8 md:flex-row">
        <UploadImage setFile={(file) => setFile(file)} />
        <div className="flex items-center">
          <div className="w-[100%]">
            <input
              type="text"
              placeholder="Add a title"
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl outline-none font-bold w-full border-b-2 border-gray-400  placeholder-gray-400 "
            />
            <h2 className="text-lg w-full text-gray-400 ">
              few words{" "}
            </h2>
            <UserTag />
            <textarea
              type="text"
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
              className="outline-none w-full mt-8 text-base border-b-2 border-gray-400  placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Add a Destination link"
              onChange={(e) => setLink(e.target.value)}
              className="outline-none w-full pb-4 mt-10  border-b-2 border-gray-400  placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
