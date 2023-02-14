import prisma from "@/lib/prisma/prismaClient";

export const getSports = async () => {
  try {
    const sports = await prisma.sport.findMany();

    return { sports };
  } catch (error) {
    return { error };
  }
};

export const getSport = async (sportName) => {
  const sport = await prisma.sport.findUnique({
    where: { name: sportName },
    include: { athletes: true },
  });

  if (!sport) return { error: "Sport not founded !" };

  return { sport };
};

export const addSport = async (data) => {
  try {
    const name = data.name.trim();

    // Check if name is not empty.
    if (name === "") return { error: "Sport name can not be empty !" };

    // Check if user already exist.
    const existingSport = await prisma.sport.findUnique({
      where: { name: name },
    });

    if (existingSport) return { error: "Sport already created !" };

    const sport = await prisma.sport.create({
      data: { name: name },
    });

    return { sport };
  } catch (error) {
    return { error };
  }
};
