import { addTitle } from "@/lib/prisma/admin/titles";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;

      const { title, error } = await addTitle(data);

      if (error) throw new Error(error);

      return res.status(200).json({
        message: "Title successfully created !",
        title,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} is not allowed.`);
};

export default handler;
