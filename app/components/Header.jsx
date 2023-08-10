"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillBellFill, BsFillChatDotsFill } from "react-icons/bs";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "../Shared/firebaseConfig";
import { useRouter } from "next/navigation";

function Header() {
  const { data: session } = useSession();

  const router = useRouter();

  const db = getFirestore(app);
  const onClickCreate =()=>{
    if(session?.user){
      router.push("/pin-builder");
    }else{
      signIn();
    }
  }

  useEffect(() => {
    saveUserInfo();
  }, [session]);

  const saveUserInfo = async () => {
    if (session?.user) {
      await setDoc(doc(db, "users", session.user.email), {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image,
      });
    }
  };
  return (
    <div className="flex gap-5 p-6 items-center">
      <Image
        src="/logo.png"
        alt="logo"
        width={50}
        height={50}
        onClick={() => router.push("/")}
        className="hover:bg-cyan-100 p-2 rounded-full"
      />
      <button className="bg-black text-white rounded-3xl px-6 py-2 ">
        Home
      </button>
      <button
        className="px-4 py-2 font-semibold border-b-4 border-white hover:border-cyan-900"
        onClick={() => onClickCreate()}
      >
        Create
      </button>
      <div className="bg-gray-200 p-3 gap-3 rounded-3xl w-full hidden md:flex">
        <AiOutlineSearch className="text-gray-600 text-xl" />
        <input
          type="text"
          placeholder="search"
          className="bg-transparent  outline-none"
        />
      </div>
      <AiOutlineSearch className="md:hidden hover:text-cyan-700 text-4xl cursor-pointer text-gray-600" />
      <BsFillBellFill className="text-4xl hover:text-cyan-700 cursor-pointer text-gray-600 " />
      <BsFillChatDotsFill className="text-4xl cursor-pointer hover:text-cyan-700 text-gray-600" />
      {session?.user ? (
        <Image
          src={session?.user?.image}
          onClick={() => router.push("/" + session.user?.email)}
          alt="logo"
          width={60}
          height={60}
          className="hover:bg-cyan-100 p-2 rounded-full"
        />
      ) : (
        <button
          className="px-4 py-2 font-semibold border-b-4 border-white hover:border-cyan-900"
          onClick={() => signIn()}
        >
          Login
        </button>
      )}
    </div>
  );
}

export default Header;
