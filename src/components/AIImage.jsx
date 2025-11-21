import { useState } from 'react';
import { Loader2, Image as ImageIcon } from 'lucide-react';

export default function AIImage({ query, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const encodedQuery = encodeURIComponent(query);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedQuery}?width=400&height=400&nologo=true&seed=${Math.random()}`;

  return (
    <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-800 border border-gray-700">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 animate-pulse">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin mb-1" />
          <span className="text-[10px] text-gray-400">Generating...</span>
        </div>
      )}

      <img
        src={imageUrl}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <ImageIcon className="w-8 h-8 text-gray-600" />
        </div>
      )}
    </div>
  );
}