import useSWR from "swr";

const useGetSports = () => {
  const { data, error, isLoading } = useSWR(
    "/api/admin/sport/getSports",
    (...args) => fetch(...args).then((res) => res.json())
  );

  return { data, error, isLoading };
};

export default useGetSports;
