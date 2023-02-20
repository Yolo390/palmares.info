const Sport = async ({ params }) => {
  const res = await fetch(
    `http://localhost:3000/api/admin/sport/getSport?name=${params.sport}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const data = await res.json();

  console.log("component data.sport", data.sport);

  return <div>{data.sport.name} page</div>;
};

export default Sport;
