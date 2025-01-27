// StudentDashboard.js
import React from "react";
import StudentCard from "../components/StudentCard"; // นำเข้า Component StudentCard
import SearchBar from "../components/SearchBar"; // นำเข้า Component Search
import { useAuth } from "../context/useAuth";
import ax from "../conf/ax";
import { useEffect, useState } from "react";
import conf from "../conf/main";
import StudenInfoBox from "../components/StudentInfoBox";
import Loading from "../components/Loading";
import { fetchSubject } from "../utils/crudAPI";

export default function StudentDashboard() {
  const { user, isLoginPending } = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subjectList, setSubjectList] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // ใช้ เก็บค่าคำค้นหา
  useEffect(() => {
    console.log(data);
  }, [data]);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await ax.get(
        conf.fetchStudentAnnouncementEndpoint(user.username)
      );
      const scoreData = res.data.data;

      const subjects = await fetchSubject();
      const subjectListData = subjects.data;
      const subjectMap = subjectListData.reduce((map, subject) => {
        map[subject.id] = {
          subject_name: subject.Name,
          subject_code: subject.subject_id,
        };
        return map;
      }, {});

      const enrichedAnnouncements = scoreData.map((score) => ({
        ...score,
        announcement: {
          ...score.announcement,
          subject_name:
            subjectMap[score.announcement.subject_id]?.subject_name || "null",
          subject_code:
            subjectMap[score.announcement.subject_id]?.subject_code || "null",
        },
      }));
      setSubjectList(subjectList);
      setData(enrichedAnnouncements);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [isLoginPending]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col h-screen w-screen gap-4 mt-12">
      <StudenInfoBox studentname={user.Name} studentid={user.username} />

      <h1 className="text-4xl font-bold text-center text-black mb-8">
        School-Record
      </h1>
      <SearchBar onSearch={(term) => setSearchTerm(term)} />

      <div className="flex flex-col gap-5 px-2 pb-2 ">
        {data ? (
          data
            .filter((score) => score.announcement?.postStatus === "publish")
            .filter((score) => {
              const lowerCaseSearchTerm = searchTerm.toLowerCase();
              return (
                score.announcement.subject_name
                  .toLowerCase()
                  .includes(lowerCaseSearchTerm) ||
                score.announcement.subject_code
                  .toLowerCase()
                  .includes(lowerCaseSearchTerm) ||
                score.announcement.Teacher?.[0]?.Name.toLowerCase().includes(
                  lowerCaseSearchTerm
                ) ||
                score.announcement.Title?.toLowerCase().includes(
                  lowerCaseSearchTerm
                ) || // ค้นหาจากชื่อครู
                score.score.toString().includes(lowerCaseSearchTerm) || // ค้นหาจากคะแนน
                (score.score > score.announcement.max_score / 2
                  ? "Pass"
                  : "Fail"
                )
                  .toLowerCase()
                  .includes(lowerCaseSearchTerm) // ค้นหาจากสถานะ (Pass/Fail)
              );
            })
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((score) => (
              <StudentCard
                key={score.id}
                Title={score.announcement.Title}
                SubjectId={score.announcement.subject_id}
                SubjectCode={score.announcement.subject_code}
                Subject={score.announcement.subject_name}
                Score={score.score}
                MaxScore={score.announcement.max_score}
                Status={
                  score.score > score.announcement.max_score / 2
                    ? "Pass"
                    : "Fail"
                }
                Date={score.updatedAt}
                Auditor={score.announcement.Teacher?.[0]?.Name}
              />
            ))
        ) : (
          <p className="text-center text-gray-500">No scores found.</p>
        )}
      </div>
    </div>
  );
}
