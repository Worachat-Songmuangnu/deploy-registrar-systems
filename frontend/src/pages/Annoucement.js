import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HrLine from "../components/HrLine";
import EditableTable from "../components/EditableTable";
import ax from "../conf/ax";
import { useAuth } from "../context/useAuth";
import Loading from "../components/Loading";
import { handleChange, handleAddRow, handleDeleteRow } from "../utils/handle";
import conf from "../conf/main";
import AnnouncementInfo from "../components/AnnouncementInfo";
import { updateScoreCondition } from "../utils/crudAPI";
import ReadExcel from "../components/Readexecel";

export default function Annoucement() {
  const { user, isLoginPending } = useAuth();
  const { announcementId } = useParams();
  const navigate = useNavigate();

  const [announcement, setAnnouncement] = useState(null);
  const [scores, setScores] = useState(null);
  const [edit, setEdit] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await ax.get(
        conf.fetchTeacherAnnouncementEndpoint(user.username, announcementId)
      );
      setAnnouncement(res.data.data[0]);
      setScores(res.data.data[0].scores);
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

  const uploadScore = async (scores) => {
    try {
      await Promise.all(updateScoreCondition(scores));
    } catch (e) {
      console.log(e);
    }
  };

  const updateAnnoucement = async (announcement) => {
    try {
      await ax.put(conf.announcementUpdateEndpoint(announcement.documentId), {
        data: announcement.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const scoresData = scores.map((score) => ({
      status: score.status,
      documentId: score.documentId || null,
      data: {
        score: score.score,
        username: score.username,
        name: score.name,
        announcement: {
          connect: { id: announcement.id },
        },
      },
    }));

    const announcementData = {
      documentId: announcement.documentId,
      data: {
        Title: announcement.Title,
        subject_name: announcement.subject_name,
        max_score: announcement.max_score,
        Teacher: { connect: { id: user.id } },
      },
    };

    try {
      setIsLoading(true);
      await updateAnnoucement(announcementData);
      await uploadScore(scoresData);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      fetchData();
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="flex flex-col w-full mt-3">
        <div className="flex flex-row justify-between ">
          <div className="flex flex-row justify-start gap-6">
            <button className="" onClick={() => navigate("/teacher/dashboard")}>
              <ArrowLeftIcon className="size-8" />
            </button>
            <p className="text-3xl">{announcement && announcement.Title}</p>
          </div>
          <label className="inline-flex items-center cursor-pointer gap-4">
            <span className="ms-3 text-sm font-medium text-gray-900">
              Edit Annoucement
            </span>
            <input
              type="checkbox"
              checked={edit}
              onChange={(e) => setEdit(!edit)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600 "></div>
          </label>
        </div>
        <HrLine />
        <form onSubmit={(e) => handleSave(e)} className="flex flex-col ">
          <AnnouncementInfo
            edit={edit}
            announcement={announcement}
            setAnnouncement={setAnnouncement}
          />
          <div className="mt-4">
            <EditableTable
              scores={scores}
              maxScore={announcement.max_score}
              edit={edit}
              handleChange={(id, field, value) =>
                handleChange(setScores, id, field, value)
              }
              handleAddRow={(count) => handleAddRow(scores, setScores, count)}
              handleDeleteRow={(e, id) => handleDeleteRow(setScores, e, id)}
            />
          </div>
          <ReadExcel edit={edit} scores={scores} setScores={setScores} />

          <div className="flex flex-row justify-end gap-3 mt-5">
            <button
              type="submit"
              className="text-white font-semibold bg-primarydark  focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
            >
              Save change
            </button>
            <button
              onClick={() => {
                fetchData();
              }}
              type="button"
              className="text-red-500 font-semibold border-red-500 border-2  focus:ring-4 focus:outline-none rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
