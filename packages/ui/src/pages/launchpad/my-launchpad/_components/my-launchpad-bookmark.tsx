'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

// Client component just for the interactive favorite button
export default function MyLaunchpadFavoriteButton({
  initialFavorite,
}: {
  initialFavorite: boolean;
}) {
  const [isFavorite, setIsFavorite] = useState<boolean>(initialFavorite);

  const toggleFavorite = async () => {
    // Toggle the local state immediately for responsive UI
    setIsFavorite(!isFavorite);

    // In a real app, make an API call to update the server
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      // If the API call fails, revert the state
      // This would be inside a catch block in a real implementation
    } catch (error) {
      console.error('Failed to update favorite status:', error);
      setIsFavorite(isFavorite); // Revert on error
    }
  };

  return (
    <button type="button" onClick={toggleFavorite} className=" p-1 ">
      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-primary text-primary' : 'text-gray-600'}`} />
    </button>
  );
}
