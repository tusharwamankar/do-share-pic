import React from "react";
import UploadImage from "./../components/UploadImage"

function Form() {
  return (
    <div className="bg-white p-6 rounded-2xl">
      <div className="flex justify-end mb-6">
        <button className="bg-red-500 p-2 text-white font-semibold px-3 rounded-lg">
          Save
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* upload image */}
        <UploadImage />
        <div className="col-span-2">
          <div className="w-[100%">
            <input
              type="text"
              placeholder="Add a title"
              className="text-[35px] outline-none font-bold w-full border-b-2 border-gray-400  placeholder-gray-400 "
            />
            <h2 className="text-[12px] w-full text-gray-400 ">
              first 40 words{" "}
            </h2>
            {/* usertag */}
            <textarea
              type="text"
              placeholder="what pin is about"
              className="outline-none w-full mt-8 pb-4 text-[14px] border-b-4 border-gray-400  placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Add a Destination link"
              className="outline-none w-full pb-4 mt-[100px]  border-b-2 border-gray-400  placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
