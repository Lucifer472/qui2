import { BarChart2, Book, BookUser, Coins, Flag, User } from "lucide-react";

export const quizRules = [
  "Get coins on the completion of each quiz.",
  "Upgrade your skills with our top quizzes.",
  "We have many top trending categories like Cricket, World, India, Business, loan, insurance & many more!",
  "Millions of quiz admirer like you showed trust on us.",
  "Challenge lakhs of players from across the world!",
];

export const navLinks = [
  { icon: BarChart2, link: "/", label: "Contest Rules" },
  { icon: Coins, link: "/", label: "Coins History" },
  { icon: Book, link: "/", label: "Blogs" },
  { icon: User, link: "/", label: "About Us" },
  { icon: BookUser, link: "/", label: "Contact Us" },
  { icon: Flag, link: "/", label: "Report an Issue" },
];

export const category: string[] = [
  "All",
  "Health Reform",
  "Test Your Car IQ",
  "Test Your Bike IQ",
  "Banking",
  "Fun Time",
  "Indian Finance",
];

export const categoryIcons: { [key: string]: string } = {
  "Health Reform": "monument.png",
  Banking: "grammar.png",
  "Test Your Car IQ": "famous.png",
  "Test Your Bike IQ": "sports.png",
  "Fun Time": "science.png",
  "Indian Finance": "brand.png",
  Festival: "festival-min.png",
};
