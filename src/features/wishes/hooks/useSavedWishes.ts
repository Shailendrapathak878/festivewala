import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'festivewala_saved_wishes';

export function useSavedWishes() {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return [];
      const item = window.localStorage.getItem(STORAGE_KEY);
      if (!item) return [];
      const parsed = JSON.parse(item);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('Failed to read saved wishes from localStorage:', e);
      return [];
    }
  });

  // Sync to localStorage whenever savedIds changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
      }
    } catch (e) {
      console.warn('Failed to write saved wishes to localStorage:', e);
    }
  }, [savedIds]);

  const toggleFavorite = useCallback((id: string) => {
    setSavedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds]
  );

  const removeFavorite = useCallback((id: string) => {
    setSavedIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const clearAllFavorites = useCallback(() => {
    setSavedIds([]);
  }, []);

  return {
    savedIds,
    savedCount: savedIds.length,
    toggleFavorite,
    isFavorite,
    removeFavorite,
    clearAllFavorites,
  };
}

