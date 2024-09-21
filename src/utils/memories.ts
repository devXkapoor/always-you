// src/utils/memories.ts

export interface Memory {
  id: number;
  text: string;
  images: string[];
}

export const memories: Memory[] = [
  {
    id: 1,
    text: "A beautiful day at the beach!",
    images: ["/images/memory1_1.jpg", "/images/memory1_2.jpg"],
  },
  {
    id: 2,
    text: "Our anniversary dinner was unforgettable.",
    images: ["/images/memory2_1.jpg", "/images/memory2_2.jpg"],
  },
  // Add more memories as needed
];

export const getRandomMemory = (): Memory => {
  const randomIndex = Math.floor(Math.random() * memories.length);
  return memories[randomIndex];
};
