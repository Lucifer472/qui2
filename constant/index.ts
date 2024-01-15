import { BarChart2, Book, BookUser, Coins, Flag, User } from "lucide-react";

export const quizRules = [
  "Get coins on the completion of each quiz.",
  "Upgrade your skills with our top quizzes.",
  "We have many top trending categories like:-",
  "Cricket, World, India, Business, loan, insurance & many more!",
  "Millions of quiz admirer like you showed trust on us.",
  "Challenge lakhs of players from across the world!",
];

export const navLinks = [
  { icon: BarChart2, link: "/rules", label: "Contest Rules" },
  { icon: Coins, link: "/", label: "Coins History" },
  { icon: Book, link: "/", label: "Blogs" },
  { icon: User, link: "/", label: "About Us" },
  { icon: BookUser, link: "/", label: "Contact Us" },
  { icon: Flag, link: "/", label: "Report an Issue" },
];

export const category: string[] = [
  "All",
  "Health Quiz",
  "Car Quiz",
  "Bike Quiz",
  "Banking Quiz",
  "Finance Quiz",
  "Fun Time",
  "Festival Quiz",
  "Bollywood Quiz",
  "Hollywood Quiz",
];

export const categoryIcons: { [key: string]: string } = {
  "Health Quiz": "monument.png",
  "Car Quiz": "auto.png",
  "Fun Time": "grammar.png",
  "Bike Quiz": "famous.png",
  "Banking Quiz": "sports.png",
  "Finance Quiz": "science.png",
  "Indian Finance": "brand.png",
  "Festival Quiz": "festival-min.png",
  "Bollywood Quiz": "trivia-min.png",
  "Hollywood Quiz": "vocab.png",
};
