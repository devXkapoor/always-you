// src/components/MemoryCard.tsx

import React from 'react';

interface Memory {
    id: number;
    text: string;
    imageUrl: string;
}

const MemoryCard: React.FC<{ memory: Memory }> = ({ memory }) => (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-md">
        <p className="text-gray-700 mb-4">{memory.text}</p>
        {memory.imageUrl && (
            <img
                src={memory.imageUrl}
                alt="Memory Image"
                className="w-full h-auto rounded-lg"
            />
        )}
    </div>
);

export default MemoryCard;
