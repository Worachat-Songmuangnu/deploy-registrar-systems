export default function ExportExcel() {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await ax.get(
        `/announcements?populate=scores&filters[Title]=${AnnoucementTitle}`
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
  }, [isLoginPending]);
}
