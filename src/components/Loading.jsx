import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="relative">
  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-500 border-b-transparent rounded-full animate-spin direction-reverse opacity-50"></div>
</div>
  );
}