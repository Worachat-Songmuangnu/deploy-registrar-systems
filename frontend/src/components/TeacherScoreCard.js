import {
  EyeIcon,
  PencilSquareIcon,
  ArchiveBoxArrowDownIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ExportExcel from "./ExportExcel";

export default function TeacherScoreCard(props) {
  const navigate = useNavigate();
  return (
    <div className="w-full shadow-primarydark border-2 h-fit rounded-lg flex flex-row p-5">
      <div className="flex flex-col w-full justify-between">
        <div>
          <p className="font-bold text-lg text-primarydark">{props.title}</p>
          <p className=" text-lg text-primarydark">Subject : {props.name}</p>
          {/* <p className=" text-base text-primarydark">Section: 02</p> */}
          <p className=" text-base text-primarydark">
            Total student : {props.total}
          </p>
          <p className="text-base text-primarydark">
            Max score : {props.max_score}
          </p>
        </div>
        <div className="flex flex-row gap-6 mt-2">
          <p className="text-sm font-thin text-primarydark">
            Post on: {dayjs(props.create).format("MMM D, YYYY h:mm A")}
          </p>
          <p className="text-sm font-thin text-primarydark">
            Last updated: {dayjs(props.update).format("MMM D, YYYY h:mm A")}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 text-white w-40 ">
        {/* <button
          onClick={() =>
            navigate(`/teacher/announcement/${props.id}`, { replace: true })
          }
          className="flex flex-row items-center justify-center gap-3 transition py-1.5 border-primarydark border-2 text-primarydark rounded-lg hover:bg-primarydark hover:text-white"
        >
          <EyeIcon className="size-5" />
          <p>View</p>
        </button> */}
        <button
          onClick={() => navigate(`/teacher/announcement/${props.id}`)}
          className="flex flex-row items-center justify-center gap-3 transition py-1.5 border-primarydark border-2 text-primarydark rounded-lg hover:bg-primarydark hover:text-white"
        >
          <PencilSquareIcon className="size-5" />
          Edit
        </button>
        <button
          onClick={() => props.handleArchive(props.id)}
          className="flex flex-row items-center justify-center gap-3 transition py-1.5 border-red-800 border-2 text-red-800 rounded-lg hover:bg-red-800 hover:text-white"
        >
          <ArchiveBoxArrowDownIcon className="size-5" />
          Archive
        </button>
        <ExportExcel title={props.title} />
      </div>
    </div>
  );
}
