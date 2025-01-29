import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface FlashcardSyncContextType {
  currentIndex: number;
  flipStates: boolean[];
  setCurrentIndex: (index: number) => void;
  toggleFlip: (index: number) => void;
  totalCards: number;
  setTotalCards: (total: number) => void;
  cards: {frontContent: string, backContent: string}[];
  setCards: (cards: {frontContent: string, backContent: string}[]) => void;
}

export const FlashcardSyncContext = createContext<FlashcardSyncContextType | null>(null);

export function FlashcardSyncProvider({
  children,
  initialTotalCards = 0
}: {
  children: React.ReactNode;
  initialTotalCards?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalCards, setTotalCards] = useState(initialTotalCards);
  const [flipStates, setFlipStates] = useState<boolean[]>(() => new Array(initialTotalCards).fill(false));
  const [cards, setCards] = useState<{frontContent: string, backContent: string}[]>([]);

  useEffect(() => {
    setFlipStates(new Array(totalCards).fill(false));
  }, [totalCards]);

  const toggleFlip = useCallback((index: number) => {
    setFlipStates(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }, []);

  return (
    <FlashcardSyncContext.Provider value={{
      currentIndex,
      flipStates,
      setCurrentIndex,
      toggleFlip,
      totalCards,
      setTotalCards,
      cards,
      setCards
    }}>
      {children}
    </FlashcardSyncContext.Provider>
  );
}

export function useFlashcardSync() {
  const context = useContext(FlashcardSyncContext);
  if (!context) {
    throw new Error('useFlashcardSync must be used within a FlashcardSyncProvider');
  }
  return context;
}