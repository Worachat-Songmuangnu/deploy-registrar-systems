import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import HrLine from "../components/HrLine";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ax from "../conf/ax";
import Loading from "../components/Loading";
import conf from "../conf/main";

export default function AddSubject() {
  const [subject, setSubject] = useState({
    subject_name: "",
    subject_id: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const createSubject = async (subject) => {
    try {
      const response = await ax.post(conf.addSubject, {
        data: subject.data,
      });
      console.log(subject.data);
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const subjectData = {
      data: {
        Name: subject.Name || "",
        subject_id: subject.subject_id || null,
      },
    };

    try {
      setIsLoading(true);
      await createSubject(subjectData);
      alert("Subject created successfully");
    } catch (error) {
      console.error("Error creating announcement:", error);
      alert("Error creating announcement:" + error.message);
    } finally {
      setIsLoading(false);
      //navigate("/teacher/dashboard");
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col w-full mt-3">
      <div className="flex flex-row justify-start gap-6">
        <button className="" onClick={() => navigate("/teacher/dashboard")}>
          <ArrowLeftIcon className="size-8" />
        </button>
        <p className="text-3xl">Create New Subject</p>
      </div>
      <HrLine />
      <form className="flex flex-col" onSubmit={handleSave}>
        <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold">
            Subject Name
            <input
              type="text"
              value={subject.Name}
              onChange={(e) => setSubject({ ...subject, Name: e.target.value })}
              className="mt-1 p-2 border rounded-lg w-full"
              placeholder="Enter subject name"
              required
            />
          </label>
          <label className="text-sm font-semibold">
            Subject ID
            <input
              type="text"
              value={subject.subject_id}
              onChange={(e) =>
                setSubject({ ...subject, subject_id: e.target.value })
              }
              className="mt-1 p-2 border rounded-lg w-full"
              placeholder="Enter subject ID"
              required
            />
          </label>
        </div>
        <div className="flex flex-row justify-end gap-3 mt-5">
          <button
            type="submit"
            className="text-white font-semibold bg-primarydark focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => navigate("/teacher/dashboard")}
            className="text-red-500 font-semibold border-red-500 border-2 focus:ring-4 focus:outline-none rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
