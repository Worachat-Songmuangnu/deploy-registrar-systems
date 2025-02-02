import { PlusCircleIcon } from "@heroicons/react/24/outline";
import HrLine from "../components/HrLine";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import { fetchTeacherSubject, updateScoreCondition } from "../utils/crudAPI";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import TeacherSubjectCard from "./TeacherSubjectCard";
import ax from "../conf/ax";

export default function TeacherSubject() {
  const { user, isLoginPending } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [subject, setSubject] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(subject);
  // }, [subject]);

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

  const handleDeleteSubject = async (id) => {
    try {
      setIsLoading(true);
      const targetSubject = subject.find((s) => s.id === id);
      console.log(targetSubject);

      // Delete subject
      await ax.delete(`/subjects/${targetSubject.documentId}`);

      // Delete all announcements of the subject
      const targetAnnouncement = targetSubject.announcements;
      await Promise.all(
        targetAnnouncement.map(async (announcement) => {
          await ax.delete(`/announcements/${announcement.documentId}`);
        })
      );

      // Delete all scores of the subject
      const targetScores = targetAnnouncement.flatMap((announcement) =>
        announcement.scores.map((score) => ({
          status: "delete",
          documentId: score.documentId || null,
        }))
      );
      await Promise.all(updateScoreCondition(targetScores));
      await fetchData();
      console.log("Subject deleted successfully");
    } catch (e) {
      console.error(e);
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
                handleDeleteSubject={handleDeleteSubject}
              />
            ))
        ) : (
          <p className="text-center text-gray-500">No Subject Found</p>
        )}
      </div>
    </div>
  );
}
