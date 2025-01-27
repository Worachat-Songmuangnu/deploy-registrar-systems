import { useEffect, useState } from "react";
import { fetchSubject } from "../utils/crudAPI";
import Loading from "./Loading";

export default function AnnouncementInfo(props) {
  const [subjectOptions, setSubjectOptions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const subjects = await fetchSubject();
      setSubjectOptions(subjects.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="flex flex-row mb-5 justify-center items-center">
        <input
          disabled={!props.edit}
          type="text"
          id="title"
          value={props.announcement.title}
          onChange={(e) =>
            props.setAnnouncement((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Title"
          required
        />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <div className="w-1/2">
          <select
            disabled={!props.edit}
            id="subject"
            value={props.announcement.subject_id || ""}
            onChange={(e) =>
              props.setAnnouncement((prev) => ({
                ...prev,
                subject_id: e.target.value,
              }))
            }
            className="border bg-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="">Select a subject</option>
            {subjectOptions?.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.subject_id.slice(0, 3)}-{subject.subject_id.slice(3)}{" "}
                {subject.Name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/2 flex flex-row mb-5 justify-center items-center">
          <input
            disabled={!props.edit}
            type="number"
            id="maxScore"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="MaxScore"
            value={props.announcement.max_score}
            onChange={(e) =>
              props.setAnnouncement((prev) => ({
                ...prev,
                max_score: e.target.value,
              }))
            }
            required
          />
        </div>
      </div>
    </>
  );
}
