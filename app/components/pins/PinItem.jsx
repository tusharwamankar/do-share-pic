import Image from "next/image";
import React from "react";
import UserTag from "../UserTag";
import { useRouter } from "next/navigation";

function PinItem({ pin }) {
  const router = useRouter();
  const user = {
    name: pin?.userName,
    image: pin?.userImage,
  };
  return (
    <div className="max-w-6xl mx-auto">
      <div onClick={() => router.push("/pin/" + pin.id)} className="flex flex-col gap-3 mx-4">
        <Image src={pin.image} alt={pin.title} width={200} height={200} />
        <h2 className="text-gray-200 text-xl font-semibold ">{pin.title}</h2>
        <h2 className="text-gray-400">@{pin.userName}</h2>
        {/* <UserTag user={user} /> */}
      </div>
    </div>
  );
}

export default PinItem;
