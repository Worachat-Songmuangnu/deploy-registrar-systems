import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import HrLine from "../components/HrLine";
import { useNavigate } from "react-router-dom";
import EditableTable from "../components/EditableTable";
import { useState } from "react";
import ax from "../conf/ax";
import { useAuth } from "../context/useAuth";
import Loading from "../components/Loading";
import { handleAddRow, handleChange, handleDeleteRow } from "../utils/handle";
import { updateScoreCondition } from "../utils/crudAPI";
import conf from "../conf/main";
import Readexcel from "../components/Readexecel";
import AnnouncementInfo from "../components/AnnouncementInfo";
export default function CreateAnnouncement() {
  const { user } = useAuth();

  const [announcement, setAnnouncement] = useState({ title: "", subject_name: "", max_score: "" });

  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState([]);

  const uploadScore = async (scores, announcementId) => {
    const scoresData = scores.map((score) => ({
      status: score.status,
      documentId: score.documentId || null,
      data: {
        score: score.score,
        username: score.username,
        name: score.name,
        announcement: {
          connect: { id: announcementId },
        },
      },
    }));
    try {
      await Promise.all(updateScoreCondition(scoresData));
    } catch (e) {
      console.log(e);
    }
  };

  const createAnnouncement = async (announcement) => {
    try {
      const responese = await ax.post(conf.announcementCreateEndpoint, {
        data: announcement.data,
      });
      return responese;
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const announcementData = {
      data: {
        Title: announcement.title || "",
        subject: announcement.subject_id || null,
        subject_id: announcement.subject_id || null,
        max_score: announcement.max_score,
        postStatus: "publish",
        Teacher: { connect: { id: user.id } },
      },
    };

    try {
      setIsLoading(true);
      const responese = await createAnnouncement(announcementData);
      const annoucementId = responese.data.data.id;
      await uploadScore(scores, annoucementId);
      navigate(`/teacher/announcement/${annoucementId}`);
      alert("announcement created successfully");
    } catch (error) {
      console.error("Error creating announcement:", error);
      alert("Error creating announcement:" + error.message);
    } finally {
      setIsLoading(false);
      navigate("/teacher/dashboard");
    }
  };

  const navigate = useNavigate();
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="flex flex-col w-full mt-3">
        <div className="flex flex-row justify-start gap-6">
          <button className="" onClick={() => navigate("/teacher/dashboard")}>
            <ArrowLeftIcon className="size-8" />
          </button>
          <p className="text-3xl">Create New Annoucement</p>
        </div>
        <HrLine />
        <form className="flex flex-col " onSubmit={handleSave}>
          <AnnouncementInfo edit={true} announcement={announcement} setAnnouncement={setAnnouncement} />
          <div className="mt-4">
            <EditableTable
              scores={scores}
              maxScore={announcement.max_score}
              edit={true}
              handleChange={(id, field, value) => handleChange(setScores, id, field, value)}
              handleAddRow={(count) => handleAddRow(scores, setScores, count)}
              handleDeleteRow={(e, id) => handleDeleteRow(setScores, e, id)}
            />
          </div>
          <Readexcel edit={true} scores={scores} setScores={setScores} />

          <div className="flex flex-row justify-end gap-3 mt-5">
            <button
              type="submit"
              className="text-white font-semibold bg-primarydark  focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
            >
              Save change
            </button>
            <button
              type="button"
              onClick={() => navigate("/teacher/dashboard")}
              className="text-red-500 font-semibold border-red-500 border-2  focus:ring-4 focus:outline-none   rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
