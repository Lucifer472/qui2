export const getRandomNumberOfUser = () => {
  return Math.floor(Math.random() * (9999 - 5000 + 1)) + 5000;
};

export const generateRandomTime = () => {
  const hours = Math.floor(Math.random() * (11 - 12 + 1)) + 12; // Random hour between 12 and 11
  const minutes = Math.floor(Math.random() * 12) * 5; // Random multiple of 5 for minutes (0, 5, 10, ..., 55)

  const formattedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${
    minutes === 0 ? "00" : minutes
  } ${hours >= 12 ? "PM" : "AM"}`;

  return formattedTime;
};
