import { getUserById } from "@/lib/prisma/admin/users";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      if (req.query.id) {
        const { user, error } = await getUserById(req.query.id);

        if (error) throw new Error(error);

        return res.status(200).json({
          message: "User successfully fetched !",
          user,
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} is not allowed.`);
};

export default handler;
