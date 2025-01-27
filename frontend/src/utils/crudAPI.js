import ax from "../conf/ax";
import conf from "../conf/main";

export const updateScoreCondition = (scores) => {
  return scores.map(async (score) => {
    if (score.status === "delete" || score.status === "hdelete") {
      await ax.delete(conf.scoreDeleteEndpoint(score.documentId));
    } else if (score.documentId) {
      await ax.put(conf.scoreUpdateEndpoint(score.documentId), {
        data: score.data,
      });
    } else {
      await ax.post(conf.scoreCreateEndpoint, { data: score.data });
    }
  });
};

export const fetchSubject = async () => {
  const responese = await ax.get(conf.fetchAllSubject);
  return responese.data;
};
