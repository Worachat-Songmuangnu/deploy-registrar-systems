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
import SearchBar from "../components/SearchBar";
import { fetchSubject } from "../utils/crudAPI";
import AnnouncementsList from "../components/AnnouncementsList";
import ModalBase from "../components/ModalBase";
import ArchiveModal from "../components/ArchiveModal";
export default function TeacherDashboard() {
  const { user, isLoginPending } = useAuth();
  const [announcements, setAnnouncements] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showArchivePopup, setShowArchivePopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectList, setSubjectList] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await ax.get(
        conf.fetchTeacherAllAnnouncementEndpoint(user.username)
      );
      const announcementsData = res.data.data;
      const subjects = await fetchSubject();
      const subjectListData = subjects.data;

      const subjectMap = subjectListData.reduce((map, subject) => {
        map[subject.id] = {
          subject_name: subject.Name,
          subject_code: subject.subject_id,
        };
        return map;
      }, {});

      // Map announcements with subject details
      const enrichedAnnouncements = announcementsData.map((announcement) => ({
        ...announcement,
        subject_name: subjectMap[announcement.subject_id]?.subject_name || null,
        subject_code: subjectMap[announcement.subject_id]?.subject_code || null,
      }));
      // Set state with enriched announcements
      setAnnouncements(enrichedAnnouncements);
      setSubjectList(subjectList);
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

      const targetAnnouncement = announcements.find(
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

      const targetAnnouncement = announcements.find(
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
      <div className="w-full flex flex-row justify-between h-10 gap-4">
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
        <button
          onClick={() => navigate("/teacher/addsubject")}
          className="flex flex-row text-nowrap items-center gap-2 w-fit px-8 py-1.5 shadow-md transition hover:bg-blue-500 hover:shadow-lg bg-primarydark text-white font-semibold rounded-lg"
        >
          <PlusCircleIcon className="size-5 " />
          Add Subject
        </button>
      </div>
      <HrLine />
      <div className="flex flex-col gap-5">
        <AnnouncementsList
          announcements={announcements}
          searchTerm={searchTerm}
          handleArchive={handleArchive}
        />
      </div>
      <ModalBase
        name={"Archived Announcements"}
        isOpen={showArchivePopup}
        setIsOpen={setShowArchivePopup}
      >
        <ArchiveModal
          onClose={() => setShowArchivePopup(false)}
          announcements={announcements}
          handlePublish={handlePublish}
        />
      </ModalBase>
    </div>
  );
}
