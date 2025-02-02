import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import {
  ChartBarIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col w-full bg-gradient-to-b from-primarydark to-primarylight ">
      <div className="flex flex-col justify-items-center items-center ">
        <p className="text-white text-4xl font-bold mt-48">
          Welcome to PSU Registrar System!
        </p>
        <p className="text-white text-2xl  mt-5 mb-20">
          This is website for grading system in Prince of Songkhla University
        </p>
        {user ? (
          <button
            onClick={() => {
              if (user.role === "student") {
                navigate("/student/dashboard");
              } else if (user.role === "teacher") {
                navigate("/teacher/dashboard");
              }
            }}
            className="text-black font-bold  bg-white px-12 w-80 py-4 mb-5 rounded-full flex flex-row gap-0.5 justify-between"
          >
            <ChartBarIcon className="size-5" />

            <p className="">Go to Dashboard</p>
            <div></div>
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-black font-bold  bg-white px-12 w-80 py-4 mb-5 rounded-full flex flex-row gap-0.5 justify-between"
          >
            <ArrowLeftEndOnRectangleIcon className="size-5" />
            <p className="">Login with Email</p>
            <div></div>
          </button>
        )}
      </div>
    </div>
  );
}
