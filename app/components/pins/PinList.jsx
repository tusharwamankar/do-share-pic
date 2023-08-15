import app from "@/app/Shared/firebaseConfig";
import React, { useEffect } from "react";
import PinItem from "@/app/components/pins/PinItem";

function PinList({ listOfPins }) {
  // console.log(listOfPins);

  return (
    <div
      className="max-w-6xl flex mx-auto gap-5 flex-wrap"
    >
      {listOfPins.map((item, idx) => (
        <div key={idx} className="">
          <PinItem pin={item} />
        </div>
      ))}
    </div>
  );
}

export default PinList;
