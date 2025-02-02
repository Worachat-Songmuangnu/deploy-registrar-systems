const conf = {
  apiUrlPrefix: "http://localhost:1337/api",
  loginEndpoint: "/auth/local",
  jwtSessionStorageKey: "auth.jwt",
  jwtRoleEndpoint: "users/me?populate=role",
  jwtUserEndpoint: "/users/me",
  fetchTeacherAnnouncementEndpoint: (username, announcementId) =>
    `announcements?populate=scores&populate=subject&filters[Teacher][username]=${username}&filters[id]=${announcementId}`,
  fetchTeacherAllAnnouncementEndpoint: (username) =>
    `/announcements?populate=Teacher&populate=scores&populate=student&filters[Teacher][username]=${username}`,
  announcementCreateEndpoint: `/announcements`,
  updateAnnoucement: (documentId) => `/announcements/${documentId}`,
  scoreDeleteEndpoint: (documentId) => `/scores/${documentId}`,
  scoreUpdateEndpoint: (documentId) => `/scores/${documentId}`,
  scoreCreateEndpoint: `/scores/`,
  announcementUpdateEndpoint: (documentId) => `/announcements/${documentId}`,
  fetchStudentAnnouncementEndpoint: (username) =>
    `/scores?populate=announcement&populate[announcement][populate][0]=Teacher&populate[announcement][populate][1]=subject&populate=students&filters[username]=${username}`,
  fetchAllSubject: `/subjects`,
  fetchTeacherSubject: (id) =>
    `/subjects?populate[0]=teacher&populate[1]=announcements&populate[announcements][populate][2]=scores&filters[teacher][id]=${id}`,
  addSubject: `/subjects`,
  exportExcel: (id) =>
    `/announcements?populate=scores&populate=subject&filters[id]=${id}`,
  deleteSubject: (documentId) => `/subjects/${documentId}`,
  deleteAnnouncement: (documentId) => `/announcements/${documentId}`,
};

export default conf;
