import prisma from "@/lib/prisma/prismaClient";

export const getCompetitionsBySport = async (sport) => {
  try {
    if (sport === "") return { error: "Sport can not be empty !" };

    const competitions = await prisma.competition.findMany({
      where: { sportId: sport },
    });

    if (!competitions) return { error: "No competitions founded !" };

    return { competitions };
  } catch (error) {
    return { error };
  }
};

export const addCompetition = async (data) => {
  try {
    const name = data.name.trim();
    const nickname = data.nickname.trim();
    const creationDate = data.creationDate;
    const sportId = data.sportId;

    // Check if fields are not empty.
    if (name === "") return { error: "Name can not be empty !" };
    if (sportId === "") return { error: "Sport ID can not be empty !" };

    const compoundUniqueCompetitionInput = {
      name,
      creationDate,
      sportId,
    };

    // Check if competition already exist.
    const existingCompetition = await prisma.competition.findUnique({
      where: {
        name_creationDate_sportId: compoundUniqueCompetitionInput,
      },
    });

    if (existingCompetition) return { error: "Competition already created !" };

    const sport = await prisma.sport.findUnique({
      where: { id: sportId },
    });

    if (!sport) return { error: "No sport founded !" };

    const competition = await prisma.competition.create({
      data: {
        name: name,
        nickname: nickname,
        creationDate: creationDate,
        sport: {
          connect: { id: sport.id },
        },
      },
    });

    return { competition };
  } catch (error) {
    return { error };
  }
};
