const conf = {
  apiUrlPrefix: "https://natural-dance-6ec6822c07.strapiapp.com/api",
  loginEndpoint: "/auth/local",
  jwtSessionStorageKey: "auth.jwt",
  jwtRoleEndpoint: "users/me?populate=role",
  jwtUserEndpoint: "/users/me",
  fetchTeacherAnnouncementEndpoint: (username, announcementId) =>
    `/announcements?populate=scores&filters[Teacher][username]=${username}&filters[id]=${announcementId}`,
  fetchTeacherAllAnnouncementEndpoint: (username) =>
    `/announcements?populate=Teacher&populate=scores&populate=student&filters[Teacher][username]=${username}`,
  announcementCreateEndpoint: `/announcements`,
  updateAnnoucement: (documentId) => `/announcements/${documentId}`,
  scoreDeleteEndpoint: (documentId) => `/scores/${documentId}`,
  scoreUpdateEndpoint: (documentId) => `/scores/${documentId}`,
  scoreCreateEndpoint: `/scores/`,
  announcementUpdateEndpoint: (documentId) => `/announcements/${documentId}`,
  fetchStudentAnnouncementEndpoint: (username) =>
    `/scores?populate=announcement&populate[announcement][populate][0]=Teacher&populate=students&filters[username]=${username}`,
};

export default conf;
