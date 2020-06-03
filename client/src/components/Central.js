import React, { useState } from "react";
import Upload from "./Upload";
import Uploadnew from "./uploadnew";

export default function Central() {
  return (
    <div className="">
      <div className="flex flex-col bg-red-100 rounded-lg items-center overflow-hidden ">
        <Upload />
      </div>
    </div>
  );
}
