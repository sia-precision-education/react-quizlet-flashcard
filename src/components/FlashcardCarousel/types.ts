import { ReactNode } from 'react';

export interface FlashcardCarouselProps {
  children: ReactNode;
  totalCards: number;
  onPageChange?: (newIndex: number) => void;
  onCardTransitioned?: (from: number, to: number) => void;
  circular?: boolean;
}

export interface FlashcardCarouselRef {
  next: () => void;
  prev: () => void;
  getCurrentIndex: () => number;
}
