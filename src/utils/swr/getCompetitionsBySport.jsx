import useSWR from "swr";

const useGetCompetitionsBySport = (sport) => {
  const { data, error, isLoading } = useSWR(
    `/api/admin/competition/getCompetitionsBySport?sport=${sport}`,
    (...args) => fetch(...args).then((res) => res.json())
  );

  return { data, error, isLoading };
};

export default useGetCompetitionsBySport;
