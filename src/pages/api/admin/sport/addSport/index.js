import { addSport } from "@/lib/prisma/admin/sports";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;

      const { sport, error } = await addSport(data);

      if (error) throw new Error(error);

      return res.status(200).json({
        message: "Sport successfully added !",
        sport,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} is not allowed.`);
};

export default handler;
