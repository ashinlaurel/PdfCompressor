import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
var FileSaver = require("file-saver");

export default function Upload() {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");
  const [orgfilesize, setOrgfilesize] = useState("");
  const [uploadperc, setUploadperc] = useState("");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    let sizer = e.target.files[0].size / 1000000;
    sizer = sizer.toFixed(2);
    setOrgfilesize(sizer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    const res = axios
      .post("/upload", formData, {
        headers: {
          "Content-Type": "application/pdf",
        },
        onUploadProgress: (progressEvent) => {
          setUploadperc(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadperc(0), 10000);
        },
      })
      .then(console.log("Sent"));
    //   .catch((err) => {
    //     if (err.response.status === 500) {
    //       console.log("Error With Server");
    //     } else {
    //       console.log(err.response.data.msg);
    //     }
    //   });
  };
  const handledownload = (e) => {
    FileSaver.saveAs("/client/output/islm2.pdf");
  };

  return (
    <div>
      <div className="text-5xl bg-gray-400 object-fill p-5">PDF Compressor</div>
      <div>
        <div className="m-5 text-xl">File Name : {filename}</div>
      </div>
      <div>
        <div className="m-5 text-xl">File Original Size : {orgfilesize} MB</div>
      </div>
      <div class="shadow w-full bg-grey-light "></div>
      <div className="relative pt-1 px-5">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
          <div
            style={{ width: `${uploadperc}%` }}
            // style={{ width: "20%" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
          ></div>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          {/* <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            onChange={handleChange}
          /> */}
          <div class="flex m-5 p-5 items-center justify-center bg-grey-lighter">
            <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
              <svg
                class="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span class="mt-2 text-base leading-normal">Select a file</span>
              <input type="file" onChange={handleChange} class="hidden" />
            </label>
          </div>
          <input type="submit" />
        </form>
      </div>
      {/* <a href="../test.pdf" target="_blank" download>
        download
      </a> */}
      <button onClick={handledownload}>Download</button>
    </div>
  );
}
