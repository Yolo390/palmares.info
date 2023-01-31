import { update } from "@/lib/prisma/admin/users";

const handler = async (req, res) => {
  if (req.method === "PATCH") {
    try {
      const data = req.body;

      const { updateUser, error } = await update(data);

      if (error) throw new Error(error);

      return res.status(200).json({
        message: "User successfully updated !",
        updateUser,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["PATCH"]);
  res.status(405).end(`Method ${req.method} is not allowed.`);
};

export default handler;
