'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PresentationData } from '@/types/presentation';
import PresentationContainer from '@/components/presentation/PresentationContainer';

export default function PresentationPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<PresentationData | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const id = params.id as string;

    // Load from localStorage
    const stored = localStorage.getItem(`presentation-${id}`);

    if (!stored) {
      setError('Presentation not found');
      setIsLoading(false);
      return;
    }

    try {
      const presentationData = JSON.parse(stored) as PresentationData;
      setData(presentationData);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to parse presentation data:', err);
      setError('Invalid presentation data');
      setIsLoading(false);
    }
  }, [mounted, params.id]);

  // Keyboard navigation
  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.push('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mounted, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Oops!</h1>
          <p className="text-xl text-purple-200 mb-8">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  // Show loading state until mounted and data loaded
  if (!mounted || isLoading || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your presentation...</div>
      </div>
    );
  }

  return (
    <>
      {/* Home button overlay */}
      <button
        onClick={() => router.push('/')}
        className="fixed top-6 left-6 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg transition-colors border border-white/20"
        title="Return home (or press ESC)"
      >
        ← Home
      </button>

      {/* Presentation */}
      <PresentationContainer data={data} />
    </>
  );
}
