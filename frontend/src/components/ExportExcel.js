import React, { useState } from "react";
import * as XLSX from "xlsx";
import ax from "../conf/ax";
import dayjs from "dayjs";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
export default function ExportExcel({ title }) {
  const [isLoading, setIsLoading] = useState(false);

  const exportToExcel = async () => {
    try {
      setIsLoading(true);

      const scores = res.data.data[0]?.scores || [];

      if (scores.length === 0) {
        alert("No data to export!");
        return;
      }

      const formatData = scores.map((score) => ({
        "Student ID": score.username,
        Name: score.name,
        Score: score.score,
        "Post Date": dayjs(score.updatedAt).format("MMM D, YYYY h:mm A"),
      }));

      console.log(scores);

      const worksheet = XLSX.utils.json_to_sheet(formatData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Scores");
      const fileName = `${title || "Export"}_Scores.xlsx`;
      XLSX.writeFile(workbook, fileName);
    } catch (e) {
      alert("Failed to export data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 text-white w-40 ">
      <button
        onClick={exportToExcel}
        className="flex flex-row items-center justify-center gap-3 transition py-1.5 border-green-700 border-2 text-green-700 rounded-lg hover:bg-green-700 hover:text-white"
      >
        <ArrowDownTrayIcon className="size-5" />
        Export
      </button>
    </div>
  );
}
