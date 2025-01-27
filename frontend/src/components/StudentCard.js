// components/StudentCard.js
import React from "react";
import dayjs from "dayjs";

const StudentCard = (props) => {
  const statusColors = {
    Pass: "bg-green-100 text-green-800",
    Fail: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800",
  };

  const progressWidth = Math.round((props.Score / props.MaxScore) * 100);

  return (
    <div className="flex flex-col max-w-full p-6  bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-col">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {props.Title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 ">
            {props.SubjectCode.slice(0, 3)}-{props.SubjectCode.slice(3)}{" "}
            {props.Subject}
          </p>
          <p className="mb-3 font-normal text-gray-700 ">
            Date : {dayjs(props.Date).format("MMM D, YYYY h:mm A")}
          </p>
        </div>

        <div className="flex flex-col">
          <p className="mb-3 font-normal text-gray-700 text-2xl ">
            Score : {props.Score}/{props.MaxScore}
          </p>
          <div
            className={`items-center text-center px-3 py-1 text-sm font-medium rounded-md ${
              statusColors[props.Status]
            }`}
          >
            {props.Status}
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StudentCard;
