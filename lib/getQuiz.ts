import db from "./db";

export const getQuizAll = async () => {
  const data = await db.quiz.findMany({
    take: 18,
  });
  return data;
};

export const getQuizbyCat = async (cat: string) => {
  const data = await db.quiz.findMany({
    take: 18,
    where: {
      category: cat,
    },
  });
  return data;
};

export const getQuizbyId = async (id: string) => {
  const mainId = parseInt(id);
  if (isNaN(mainId)) return null;

  const data = await db.quiz.findUnique({
    where: {
      id: mainId,
    },
  });

  return data;
};
