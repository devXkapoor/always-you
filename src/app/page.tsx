// src/app/page.tsx

'use client';

import { useEffect, useState } from 'react';
import MemoryCard from '@/components/MemoryCard'; // Adjust the path based on your project structure

interface Memory {
  id: number;
  text: string;
  imageUrl: string;
}

const HomePage = () => {
  const [memory, setMemory] = useState<Memory | null>(null);

  useEffect(() => {
    const fetchRandomMemory = async () => {
      const response = await fetch('/api/memories/random');
      const data = await response.json();
      setMemory(data.memory || { id: 0, text: "No memory found", imageUrl: "" }); // Fallback to a default memory
    };

    fetchRandomMemory();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100">
      <h1 className="text-3xl font-bold mb-8 text-pink-600">Show Me a Memory</h1>
      <button
        onClick={() => window.location.reload()}
        className="mb-6 bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700"
      >
        Show Me a Memory
      </button>
      {memory && (
        <MemoryCard memory={memory} />
      )}
    </div>
  );
};

export default HomePage;
