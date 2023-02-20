import SportsList from "@/components/admin/list/SportsList";
import clsx from "clsx";

const Sports = async () => {
  const res = await fetch("http://localhost:3000/api/admin/sport/getSports", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  const { sports } = data;

  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-5 mt-5 mb-24",
        "sm:gap-8 sm:mt-12 sm:mb-32"
      )}
    >
      <h1>List of all sports.</h1>

      {sports &&
        sports.map((sport) => <SportsList key={sport.id} sport={sport} />)}
    </div>
  );
};

export default Sports;
