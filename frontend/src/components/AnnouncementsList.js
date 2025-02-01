import React from 'react';
import TeacherScoreCard from './TeacherScoreCard';

const AnnouncementsList = ({ announcements, searchTerm, handleArchive }) => {
  const filteredAnnouncements = announcements
    .filter((announcement) => announcement.postStatus === "publish")
    .filter((announcement) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        announcement.Title.toLowerCase().includes(lowerCaseSearchTerm) ||
        announcement.subject_name.toLowerCase().includes(lowerCaseSearchTerm) ||
        announcement.postStatus.toLowerCase().includes(lowerCaseSearchTerm) ||
        announcement.createdAt.toLowerCase().includes(lowerCaseSearchTerm) ||
        announcement.updatedAt.toLowerCase().includes(lowerCaseSearchTerm) ||
        announcement.max_score.toString().includes(lowerCaseSearchTerm)
      );
    })
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <>
      {filteredAnnouncements.length > 0 ? (
        filteredAnnouncements.map((announcement) => (
          <TeacherScoreCard
            key={announcement.id}
            id={announcement.id}
            Title={announcement.Title}
            name={announcement.subject_name}
            subject_code={announcement.subject_code}
            subject_name={announcement.subject_name}
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
    </>
  );
};

export default AnnouncementsList;