import { getSports } from "@/lib/prisma/admin/sports";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { sports, error } = await getSports();

      if (error) throw new Error(error);

      return res.status(200).json({
        message: "Sports successfully loaded !",
        sports,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} is not allowed.`);
};

export default handler;
