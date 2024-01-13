import db from "@/lib/db";

export const getStarterQuestion = async () => {
  const data = await db.question.findManyRandom(2, {
    where: {
      quizId: 10,
    },
    select: {
      id: true,
      question: true,
      option1: true,
      option2: true,
      option3: true,
      option4: true,
      answer: true,
      quizId: true,
    },
  });

  return data;
};

export const getAllQuestion = async (id: string) => {
  const mainId = parseInt(id);
  if (isNaN(mainId)) return null;

  const data = await db.question.findMany({
    take: 15,
    where: {
      quizId: mainId,
    },
  });

  return data;
};
