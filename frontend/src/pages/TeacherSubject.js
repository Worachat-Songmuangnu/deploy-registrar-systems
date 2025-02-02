import { PlusCircleIcon } from "@heroicons/react/24/outline";
import HrLine from "../components/HrLine";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import { fetchTeacherSubject } from "../utils/crudAPI";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import TeacherSubjectCard from "./TeacherSubjectCard";

export default function TeacherSubject() {
  const { user, isLoginPending } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [subject, setSubject] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const subjects = await fetchTeacherSubject(user.id);
      const SubjectData = subjects.data;
      setSubject(SubjectData);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [isLoginPending]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="w-full flex flex-col mt-3">
      <button className="" onClick={() => navigate("/teacher/dashboard")}>
        <ArrowLeftIcon className="size-8" />
      </button>
      <div className="mb-12">
        <p className=" text-4xl  text-center">Manage Your Subject</p>
      </div>
      <div className="w-full flex flex-row justify-between h-10 gap-4">
        <div className="flex flex-row w-full gap-4">
          <SearchBar onSearch={(term) => setSearchTerm(term)} />
        </div>
        <button
          onClick={() => navigate("/teacher/addsubject")}
          className="flex flex-row text-nowrap items-center gap-2 w-fit px-8 py-1.5 shadow-md transition hover:bg-green-700 hover:shadow-lg bg-green-600 text-white font-semibold rounded-lg"
        >
          <PlusCircleIcon className="size-5 " />
          Create New Subject
        </button>
      </div>
      <HrLine />
      <div className="flex flex-col gap-5">
        {subject.length > 0 ? (
          subject
            .filter((subject) => {
              const lowerCaseSearchTerm = searchTerm.toLowerCase();
              return (
                subject.Name.toLowerCase().includes(lowerCaseSearchTerm) ||
                subject.subject_id.toLowerCase().includes(lowerCaseSearchTerm)
              );
            })
            .map((subject, index) => (
              <TeacherSubjectCard
                key={index}
                subject={subject}
                searchTerm={searchTerm}
              />
            ))
        ) : (
          <p className="text-center text-gray-500">No Subject Found</p>
        )}
      </div>
    </div>
  );
}
