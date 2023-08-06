import React from "react";
import { HiArrowUpCircle } from "react-icons/hi2"

function UploadImage() {
  return <div>
    <label />
    <HiArrowUpCircle />
    <h1>Upload Image</h1>
    <input type="file" className="hidden" />
  </div>;
}

export default UploadImage;
