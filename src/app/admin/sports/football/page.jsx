const Football = async () => {
  const res = await fetch(
    `http://localhost:3000/api/admin/sport/getSport?name=FOOTBALL`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const data = await res.json();

  console.log("component data.sport", data.sport);

  return <div>Football page</div>;
};

export default Football;
