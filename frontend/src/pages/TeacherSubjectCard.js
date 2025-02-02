import { TrashIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";

export default function TeacherSubjectCard({ subject, handleDeleteSubject }) {
  return (
    <>
      <div className="border rounded-lg p-4 shadow-md bg-white flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-1/2">
            <p className="text-xl font-semibold">
              {subject.subject_id.slice(0, 3)}-{subject.subject_id.slice(3)}{" "}
              {subject.Name}
            </p>
            {subject.announcements.length > 0 ? (
              <p className="mt-1 text-base text-gray-500">
                Total {subject.announcements.length} Announcements
              </p>
            ) : (
              <p className="mt-1 text-base text-gray-500">No Announcement </p>
            )}
            <div className="flex flex-col ml-6 max-h-32 h-fit overflow-y-scroll">
              {subject.announcements
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((announcement, index) => (
                  <div key={index} className="pt-2">
                    <a
                      href={`/teacher/announcement/${announcement.id}`}
                      className={`text-gray-700   ${
                        announcement.postStatus === "publish"
                          ? "text-green-600"
                          : "text-red-500"
                      } `}
                    >
                      <div className="flex flex-row gap-40 justify-between ">
                        <div className="hover:underline">
                          <span className="font-semibold ">
                            [
                            {announcement.postStatus === "publish"
                              ? "Publish"
                              : "Archive"}
                            ]
                          </span>
                          <span> {announcement.Title} </span>
                        </div>
                        <span className="text-gray-500 text-sm hover:underline">
                          {dayjs(announcement.createdAt).format(
                            "MMM D, YYYY h:mm A"
                          )}
                        </span>
                      </div>
                    </a>
                  </div>
                ))}
            </div>
          </div>
          <div className="w-44">
            <button
              onClick={() => handleDeleteSubject(subject.id)}
              className="w-full flex flex-row items-center justify-center gap-3 transition py-1.5 border-red-800 border-2 text-red-800 rounded-lg hover:bg-red-800 hover:text-white"
            >
              <TrashIcon className="size-5" />
              Delete Subject
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
