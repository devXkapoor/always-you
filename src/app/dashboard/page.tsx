'use client';

import { useState } from 'react';

const UploadPage = () => {
    const [text, setText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('text', text);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload memory');
            }

            const result = await response.json();

            if (result.memory && result.memory.imageUrl) {
                setSuccess('Memory uploaded successfully! Image URL: ' + result.memory.imageUrl);
            } else {
                setError('Memory uploaded, but no image URL returned.');
            }

            setText('');
            setFile(null);
        } catch (error) {
            console.error(error);
            setError('An error occurred while uploading. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4">
            <h1 className="text-3xl font-semibold mb-6 text-pink-600">Upload a Memory</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleUpload} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Memory description..."
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-4 w-full"
                    required
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
                >
                    Upload Memory
                </button>
            </form>
        </div>
    );
};

export default UploadPage;
