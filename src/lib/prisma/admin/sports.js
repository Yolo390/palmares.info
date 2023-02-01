import prisma from "@/lib/prisma/prismaClient";

export const getSports = async () => {
  try {
    const sports = await prisma.sport.findMany();

    return { sports };
  } catch (error) {
    return { error };
  }
};

export const addSport = async (sport) => {
  try {
    const name = sport.name.trim();

    // Check if name is not empty.
    if (name === "") return { error: "Name can not be empty !" };

    // Check if user already exist.
    const existingSport = await prisma.sport.findUnique({
      where: { name: name },
    });

    if (existingSport) return { error: "Sport already created !" };

    const addedSport = await prisma.sport.create({
      data: { name: name },
    });

    return { addedSport };
  } catch (error) {
    return { error };
  }
};
