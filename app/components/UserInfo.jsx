import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function UserInfo({ userInfo }) {
  const router = useRouter();
  const { data: session } = useSession();

  const onLogoutClick = () => {
    signOut();
    router.push("/");
  };
  return (
    <div className="flex flex-col justify-center items-center mb-10 mx-auto">
      <Image
        src={userInfo.userImage}
        alt="userImage"
        width={80}
        height={80}
        className=" rounded-full"
        priority
      />
      <h1 className="text-2xl font-semibold my-4">{userInfo.userName}</h1>
      <h2 className="text-gray-400 ">{userInfo.email}</h2>
      <div className="flex justify-between text-black">
        <button
          onClick={() => navigator.clipboard.writeText(session.user.email)}
          className=" bg-cyan-500 px-6 py-2 rounded-3xl font-bold my-4 border border-cyan-500 hover:border-cyan-500 hover:bg-transparent hover:text-white hover:cursor-pointer mx-2 "
        >
          Share
        </button>
        {session?.user.email == userInfo.email ? (
          <button
            onClick={() => onLogoutClick()}
            className=" bg-cyan-500 px-6 py-2 rounded-3xl font-bold my-4 border hover:border-cyan-500 border-cyan-500 hover:text-white hover:bg-transparent hover:cursor-pointer mx-2"
          >
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default UserInfo;
