import React, { use, useEffect, useRef, useState } from "react";
import readXlsxFile from "read-excel-file";
import { handleDeleteRow } from "../utils/handle";

export default function ReadExcel(props) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      props.setScores((prevData) =>
        prevData.map((row) => {
          return {
            ...row,
            status: "hdelete",
          };
        })
      );
      readXlsxFile(file).then((rows) => {
        const dataWithIds = rows.slice(1).map((row, index) => ({
          id: index, // Unique identifier for each row
          username: String(row[0]),
          name: String(row[1]),
          score: String(row[2]),
        }));
        props.setScores((prevData) => [...prevData, ...dataWithIds]);
      });
    }
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="file_input">
        Upload file
      </label>
      <input
        disabled={!props.edit}
        className="p-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none  "
        ref={fileInputRef}
        type="file"
        id="file-input"
        accept=".xlsx"
        onChange={handleFileChange}
      />
      <input />
    </div>
  );
}
