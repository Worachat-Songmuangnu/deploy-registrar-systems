export default function AnnouncementInfo(props) {
  return (
    <>
      <div className="flex flex-row mb-5 justify-center items-center ">
        <input
          disabled={!props.edit}
          type="text"
          id="title"
          value={props.announcement.Title}
          onChange={(e) =>
            props.setAnnouncement((prev) => ({
              ...prev,
              Title: e.target.value,
            }))
          }
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Title"
          required
        />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <div className="w-1/2">
          <input
            disabled={!props.edit}
            type="text"
            id="subject name"
            value={props.announcement.subject_name}
            onChange={(e) =>
              props.setAnnouncement((prev) => ({
                ...prev,
                subject_name: e.target.value,
              }))
            }
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Subject name"
            required
          />
        </div>
        <div className="w-1/2 flex flex-row mb-5 justify-center items-center ">
          <input
            disabled={!props.edit}
            type="number"
            id="maxScore"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
