import { useNavigate } from "react-router-dom";
import TeacherScoreCard from "../components/TeacherScoreCard";
import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/outline";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  PaperAirplaneIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import HrLine from "../components/HrLine";
import ax from "../conf/ax";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import Loading from "../components/Loading";
import conf from "../conf/main";
import dayjs from "dayjs";
import SearchBar from "../components/SearchBar"; // นำเข้า Component Search
export default function TeacherDashboard() {
  const { user, isLoginPending } = useAuth();
  const [annoucements, setAnnoucements] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [showArchivePopup, setShowArchivePopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // ใช้ เก็บค่าคำค้นหา
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await ax.get(
        conf.fetchTeacherAllAnnouncementEndpoint(user.username)
      );
      setAnnoucements(res.data.data);
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

  const updateAnnoucement = async (announcement) => {
    try {
      await ax.put(conf.updateAnnoucement(announcement.documentId), {
        data: announcement.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleArchive = async (id) => {
    try {
      setIsLoading(true);

      const targetAnnouncement = annoucements.find(
        (announcement) => announcement.id === id
      );
      if (!targetAnnouncement) {
        throw new Error("Announcement not found");
      }

      const announcementData = {
        documentId: targetAnnouncement.documentId,
        data: {
          postStatus: "archive",
        },
      };

      await updateAnnoucement(announcementData);
      fetchData();
    } catch (e) {
      console.error("Error archiving announcement:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async (id) => {
    try {
      setIsLoading(true);

      const targetAnnouncement = annoucements.find(
        (announcement) => announcement.id === id
      );
      if (!targetAnnouncement) {
        throw new Error("Announcement not found");
      }

      const announcementData = {
        documentId: targetAnnouncement.documentId,
        data: {
          postStatus: "publish",
        },
      };

      await updateAnnoucement(announcementData);
      fetchData();
    } catch (e) {
      console.error("Error archiving announcement:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="w-full flex flex-col mt-16">
      <div className="mb-12">
        <p className=" text-4xl  text-center">Your Annoucement</p>
      </div>
      <div className="w-full flex flex-row justify-between h-10">
        <div className="flex flex-row w-full gap-4">
          <SearchBar onSearch={(term) => setSearchTerm(term)} />
        </div>
        <button
          onClick={() => setShowArchivePopup(true)}
          className="flex flex-row text-nowrap items-center gap-4 ml-2 mr-2 w-fit px-5 py-1 shadow-md transition hover:bg-red-300 hover:shadow-lg boder bg-red-500 text-white font-semibold rounded-lg"
        >
          <EyeIcon className="size-5 " />
          View Archived
        </button>
        <button
          onClick={() => navigate("/teacher/announcement")}
          className="flex flex-row text-nowrap items-center gap-2 w-fit px-8 py-1.5 shadow-md transition hover:bg-blue-500 hover:shadow-lg bg-primarydark text-white font-semibold rounded-lg"
        >
          <PlusCircleIcon className="size-5 " />
          Add Annoucement
        </button>
      </div>
      <HrLine />
      <div className="flex flex-col gap-5">
        {annoucements ? (
          annoucements
            .filter((announcement) => announcement.postStatus === "publish")
            .filter((announcement) => {
              const lowerCaseSearchTerm = searchTerm.toLowerCase();
              return (
                announcement.Title.toLowerCase().includes(
                  lowerCaseSearchTerm
                ) || // ค้นหาจากชื่อประกาศ
                announcement.subject_name
                  .toLowerCase()
                  .includes(lowerCaseSearchTerm) || // ค้นหาจากชื่อวิชา
                announcement.postStatus
                  .toLowerCase()
                  .includes(lowerCaseSearchTerm) || // ค้นหาจากสถานะ
                announcement.createdAt
                  .toLowerCase()
                  .includes(lowerCaseSearchTerm) || // ค้นหาจากวันที่สร้าง
                announcement.updatedAt
                  .toLowerCase()
                  .includes(lowerCaseSearchTerm) || // ค้นหาจากวันที่อัปเดต
                announcement.max_score.toString().includes(lowerCaseSearchTerm)
              );
            })
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((announcement) => (
              <TeacherScoreCard
                id={announcement.id}
                title={announcement.Title}
                name={announcement.subject_name}
                subject_id={announcement.subject_id}
                create={announcement.createdAt}
                update={announcement.updatedAt}
                scores={announcement.scores.data}
                total={announcement.scores.length}
                max_score={announcement.max_score}
                status={announcement.postStatus}
                handleArchive={handleArchive}
              />
            ))
        ) : (
          <p className="text-center text-gray-500">No announcements found.</p>
        )}
      </div>
      {showArchivePopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-2/3 max-h-3/4 p-6 rounded-lg overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Archived Announcements</h2>
              <button
                onClick={() => setShowArchivePopup(false)}
                className="text-red-500 font-semibold"
              >
                Close
              </button>
            </div>
            <HrLine />
            <div className="flex flex-col gap-3">
              {annoucements &&
              annoucements.filter(
                (announcement) => announcement.postStatus === "archive"
              ).length > 0 ? (
                annoucements
                  .filter(
                    (announcement) => announcement.postStatus === "archive"
                  )
                  .map((announcement) => (
                    <div
                      key={announcement.id}
                      className="flex flex-row items-center justify-between p-4 border rounded-lg shadow-sm"
                    >
                      <div>
                        <h3 className="text-lg font-semibold">
                          {announcement.Title}
                        </h3>

                        <p className="text-gray-600">
                          Subject: {announcement.subject_name}
                        </p>
                        <p className="text-gray-500">
                          Last Updated:{" "}
                          {new dayjs(announcement.updatedAt).format(
                            "MMM D, YYYY h:mm A"
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => handlePublish(announcement.id)}
                        className=" h-fit px-2 flex flex-row items-center justify-center gap-3 transition py-2 border-blue-800 border-2 text-blue-800 rounded-lg hover:bg-blue-800 hover:text-white"
                      >
                        <PaperAirplaneIcon className="size-4" />
                        Publish
                      </button>
                    </div>
                  ))
              ) : (
                <p className="text-center text-gray-500">
                  No archived announcements found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
