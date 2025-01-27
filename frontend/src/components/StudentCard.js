// components/StudentCard.js
import React from "react";
import dayjs from "dayjs";

const StudentCard = (props) => {
  return (
    <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{props.Title}</h5>
      <div className="flex flex-col gap-4">
        <p className="mb-3 font-normal text-gray-700 ">
          {props.SubjectCode.slice(0, 3)}-{props.SubjectCode.slice(3)} {props.Subject}
        </p>
      </div>
      <div className="flex flex-row gap-10">
        <div className="flex flex-col">
          <p className="mb-3 font-normal text-gray-700 text-xl">
            Score : {props.Score}/{props.MaxScore}
          </p>
          <p className="mb-3 font-normal text-gray-700 ">Date : {dayjs(props.Date).format("MMM D, YYYY h:mm A")}</p>
        </div>
        <div className="flex flex-col">
          <p className="mb-3 font-normal text-gray-700 text-xl">Status : {props.Status}</p>
          <p className="mb-3 font-normal text-gray-700 ">Auditor : {props.Auditor}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
