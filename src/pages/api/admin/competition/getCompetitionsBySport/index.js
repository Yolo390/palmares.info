import { getCompetitionsBySport } from "@/lib/prisma/admin/competitions";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const sport = req.query.sport;

      const { competitions, error } = await getCompetitionsBySport(sport);

      if (error) throw new Error(error);

      return res.status(200).json({
        message: "Competitions successfully loaded !",
        competitions,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} is not allowed.`);
};

export default handler;
