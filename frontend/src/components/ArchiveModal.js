import React from "react";
import HrLine from "./HrLine"; // Assuming you have an HrLine component
import dayjs from "dayjs";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const ArchiveModal = ({ onClose, announcements, handlePublish }) => {
  return (
    <div className="bg-white w-2/3 mx-auto max-h-3/4 p-6 rounded-lg overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Archived Announcements</h2>
        <button onClick={onClose} className="text-red-500 font-semibold">
          Close
        </button>
      </div>
      <HrLine />
      <div className="flex flex-col gap-3 overflow-y-auto max-h-96 ">
        {announcements &&
        announcements.filter(
          (announcement) => announcement.postStatus === "archive"
        ).length > 0 ? (
          announcements
            .filter((announcement) => announcement.postStatus === "archive")
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
                  className="h-fit px-2 flex flex-row items-center justify-center gap-3 transition py-2 border-blue-800 border-2 text-blue-800 rounded-lg hover:bg-blue-800 hover:text-white"
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
  );
};

export default ArchiveModal;
