import prisma from "@/lib/prisma/prismaClient";

export const addTitle = async (data) => {
  try {
    const date = data.date;
    const competitionId = data.competitionId;

    // Check if fields are not empty.
    if (competitionId === "")
      return { error: "Competition ID can not be empty !" };

    const compoundUniqueTitleInput = {
      date,
      competitionId,
    };

    // Check if title already exist.
    const existingTitle = await prisma.title.findUnique({
      where: {
        date_competitionId: compoundUniqueTitleInput,
      },
    });

    if (existingTitle) return { error: "Title already created !" };

    // Double check to be sure.
    const competition = await prisma.competition.findUnique({
      where: { id: competitionId },
    });

    if (!competition) return { error: "No competition founded !" };

    const title = await prisma.title.create({
      data: {
        date: date,
        competition: {
          connect: { id: competition.id },
        },
      },
    });

    return { title };
  } catch (error) {
    return { error };
  }
};
