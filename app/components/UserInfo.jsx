import Image from "next/image";
import { userInfo } from "os";
import React from "react";

function UserInfo({ userInfo }) {
  console.log(userInfo);
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={userInfo.userImage}
        alt="userImage"
        width={80}
        height={80}
        className=" rounded-full "
      />
      <h1 className="text-2xl font-semibold my-4">{userInfo.userName}</h1>
      <h2 className="text-gray-500 ">{userInfo.email}</h2>
      <button className=" bg-cyan-200 px-6 py-2 rounded-3xl font-bold my-4 border hover:border-cyan-700 hover:bg-transparent hover:cursor-pointer ">Share</button>
    </div>
  );
}

export default UserInfo;
