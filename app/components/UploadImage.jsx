import React, { useState } from "react";
import { HiArrowUpCircle } from "react-icons/hi2";

function UploadImage({ setFile }) {
  const [selectedFile, setSelectedFile] = useState();
  return (
    <div className="h-[450px] bg-white/75 rounded-lg">
      <label className="m-5 flex flex-col justify-center items-center cursor-pointer h-96 w-80 border-2 border-gray-300 border-dashed rounded-lg text-gray-600">
        {!selectedFile ? (
          <div className="flex flex-col items-center">
            <HiArrowUpCircle className="text-[22px]" />
            <h2 className="font-semibold">Click to Upload</h2>
          </div>
        ) : null}
        {selectedFile ? (
          <img
            src={window.URL.createObjectURL(selectedFile)}
            alt="selected image"
            width={500}
            height={800}
            className="object-contain h-[90%]"
          />
        ) : null}
        <input
          id="dropzone-file"
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setSelectedFile(e.target.files[0]);
          }}
          className="hidden"
        />
      </label>
    </div>
  );
}

export default UploadImage;
