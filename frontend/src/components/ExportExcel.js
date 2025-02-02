import React, { useState } from "react";
import * as XLSX from "xlsx";
import ax from "../conf/ax";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import conf from "../conf/main";
export default function ExportExcel({ id }) {
  const [isLoading, setIsLoading] = useState(false);
  const exportToExcel = async () => {
    try {
      setIsLoading(true);

      const res = await ax.get(conf.exportExcel(id));

      const data = res.data.data[0];
      const scores = data?.scores || [];
      const subject = data?.subject || {};

      if (scores.length === 0) {
        alert("No data to export!");
        return;
      }

      const title = data?.Title || "Export";
      const subjectName = subject?.Name || "";
      const maxScore = data?.max_score || "N/A";

      const formatData = scores.map((score) => ({
        "Student ID": score.username,
        [`Score (${maxScore})`]: score.score,
      }));

      const worksheet = XLSX.utils.json_to_sheet(formatData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Scores");

      const fileName = `${title} ${subjectName}_Scores.xlsx`;
      XLSX.writeFile(workbook, fileName);
    } catch (e) {
      alert("Failed to export data.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <></>
  ) : (
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
