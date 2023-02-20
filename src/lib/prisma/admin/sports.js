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
  try {
    const sport = await prisma.sport.findUnique({
      where: { name: sportName },
      include: { athletes: true },
    });

    if (!sport) return { error: "Sport not founded !" };

    return { sport };
  } catch (error) {
    return { error };
  }
};

export const addSport = async (data) => {
  try {
    const name = data.name.trim();
    const type = data.type.trim();

    // Check if name or type are not empty.
    if (name === "") return { error: "Sport name can not be empty !" };
    if (type === "") return { error: "Sport type can not be empty !" };

    // Check if user already exist.
    const existingSport = await prisma.sport.findUnique({
      where: { name: name },
    });

    if (existingSport) return { error: "Sport already created !" };

    const sport = await prisma.sport.create({
      data: { name: name, type: type },
    });

    return { sport };
  } catch (error) {
    return { error };
  }
};
