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


/**
 * FlashcardSyncProvider Component
 *
 * This component provides context for synchronizing flashcard states across different components.
 * It manages the current index of the flashcard, flip states, total number of cards, and the card contents.
 *
 * Props:
 * - children: The child components that will have access to the FlashcardSyncContext.
 * - initialTotalCards: The initial number of cards in the flashcard array.
 *
 * Example usage:
 *
 * <FlashcardSyncProvider initialTotalCards={5}>
 *   <FlashcardArray cards={cards} />
 *   <FlashcardPagination />
 * </FlashcardSyncProvider>
 *
 * The component uses the `useState` hook to manage the state of the flashcards.
 * The `useEffect` hook is used to reset the flip states whenever the total number of cards changes.
 * The `toggleFlip` function is used to toggle the flip state of a specific card.
 */

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

/**
 * useFlashcardSync Hook
 *
 * This hook provides access to the flashcard synchronization context, allowing components to
 * read and update the current state of the flashcards.
 *
 * The hook returns an object with the following properties:
 * - currentIndex: The index of the currently displayed flashcard.
 * - flipStates: An array of boolean values indicating the flip state of each flashcard.
 * - setCurrentIndex: A function to update the current index.
 * - toggleFlip: A function to toggle the flip state of a specific flashcard.
 * - totalCards: The total number of flashcards.
 * - setTotalCards: A function to update the total number of flashcards.
 * - cards: An array of objects representing the flashcards, each containing frontContent and backContent.
 * - setCards: A function to update the array of flashcards.
 *
 * Example usage:
 *
 * const {
 *   currentIndex,
 *   flipStates,
 *   setCurrentIndex,
 *   toggleFlip,
 *   totalCards,
 *   setTotalCards,
 *   cards,
 *   setCards
 * } = useFlashcardSync();
 *
 * @throws Will throw an error if the hook is used outside of a FlashcardSyncProvider.
 */

export function useFlashcardSync() {
  const context = useContext(FlashcardSyncContext);
  if (!context) {
    throw new Error('useFlashcardSync must be used within a FlashcardSyncProvider');
  }
  return context;
}