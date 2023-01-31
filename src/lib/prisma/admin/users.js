import prisma from "@/lib/prisma/prismaClient";

export const getUserById = async (id) => {
  try {
    if (id === null || id === undefined) return { error: "No `id` provided !" };

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: Boolean(true),
        email: Boolean(true),
        name: Boolean(true),
      },
    });

    return { user };
  } catch (error) {
    return { error };
  }
};

export const update = async (user) => {
  try {
    const email = user.email.trim();
    const name = user.name.trim();

    // Check if email and password are not empty.
    if (email === "" || name === "")
      return { error: "Fields can not be empty !" };

    // Check if email is valid.
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(regEx)) return { error: "Email is not valid !" };

    const updateUser = await prisma.user.update({
      where: { email },
      data: { name: name },
    });

    return { updateUser };
  } catch (error) {
    return { error };
  }
};
