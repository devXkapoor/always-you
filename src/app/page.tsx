// src/app/page.tsx

'use client';

import { useEffect, useState } from 'react';
import MemoryCard from '@/components/MemoryCard';
import Link from 'next/link';

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
      setMemory(data.memory || { id: 0, text: "No memory found", imageUrl: "" });
    };
    fetchRandomMemory();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-900 text-white">
      <h1 className="text-5xl font-bold mb-8">alwaysyou.</h1>
      <Link href="/dashboard">
        <button className="bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 mb-6">
          Add a Memory
        </button>
      </Link>
      <button onClick={() => window.location.reload()} className="bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 mb-6">
        Show Me a Memory
      </button>
      {memory && (
        <MemoryCard memory={memory} />
      )}
    </div>
  );
};

export default HomePage;