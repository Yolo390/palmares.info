import { getSport } from "@/lib/prisma/admin/sports";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const name = req.query.name;

      const { sport, error } = await getSport(name);

      if (error) throw new Error(error);

      return res.status(200).json({
        message: "Sport successfully loaded !",
        sport,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} is not allowed.`);
};

export default handler;
