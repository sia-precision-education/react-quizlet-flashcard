import React, {
  Children,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useFlashcardSync } from "@/contexts/FlashcardSyncContext";
import clsx from "clsx";
import { PaginationButtonLeft, PaginationButtonRight } from "../PaginationButton/PaginationButton";

interface FlashcardCarouselProps {
  children: ReactNode;
  onPageChange?: (newIndex: number) => void;
  onCardTransitioned?: (from: number, to: number) => void;
  circular?: boolean;
}

export interface FlashcardCarouselRef {
  next: () => void;
  prev: () => void;
  getCurrentIndex: () => number;
}


export function FlashcardThumbnail({
  frontContent,
  backContent,
  className,
  header
}: {
  header?: string;
  frontContent: string;
  backContent: string;
  className?: string;
}) {

  const frontRef = useRef<HTMLDivElement>(null);

  const getWidth = () => {
    if (frontRef.current) {
      const boundingRect = frontRef.current.getBoundingClientRect();
      return boundingRect.width;
    }
    return 0;
  };

  const getTextSize = (width: number): string => {
    // Base size is 16px (text-base)
    // Scale factor determines how quickly text grows with width
    const scaleFactor = 0.05;
    const baseSize = 16;
    const size = width * scaleFactor;

    console.log(width, scaleFactor, baseSize, size);

    return `${size}px`;
  };

  const textSize = getTextSize(getWidth());


  return (
    <div
      className={clsx(
        "aspect-[5/3] h-full bg-gray-900 rounded-lg shadow-lg flex items-center justify-center flex-col p-4 border-1 border-gray-500/50",
        className,
      )}
      style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)" }}
      ref={frontRef}
    >
      {header && (
        <h1 className="text-lg text-sky-500 font-bold">{header}</h1>
      )}
      <span
        className={clsx("text-center text-white text-sm")}
        dangerouslySetInnerHTML={{ __html: frontContent }}
      />
    </div>
  );
}

const FlashcardCarousel = forwardRef<
  FlashcardCarouselRef,
  FlashcardCarouselProps
>(
  ({ children, onPageChange, onCardTransitioned, circular = false }, ref) => {
    const [paginationIndex, setPaginationIndex] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const { currentIndex, setCurrentIndex, totalCards, cards } =
      useFlashcardSync();

    const NUM_CARDS_TO_SHOW = 3;

    const canGoNext = (): boolean => {
      return circular || currentIndex < totalCards - 1;
    };

    const canGoPrev = (): boolean => {
      return circular || currentIndex > 0;
    };

    useImperativeHandle(ref, () => ({
      next() {
        if (!canGoNext()) return;
        const newIndex = circular
          ? (currentIndex + 1) % totalCards
          : Math.min(currentIndex + 1, totalCards - 1);
        setCurrentIndex(newIndex);
        onPageChange?.(newIndex);
        onCardTransitioned?.(currentIndex, newIndex);
      },
      prev() {
        if (!canGoPrev()) return;
        const newIndex = circular
          ? (currentIndex - 1 + totalCards) % totalCards
          : Math.max(currentIndex - 1, 0);
        setCurrentIndex(newIndex);
        onPageChange?.(newIndex);
        onCardTransitioned?.(currentIndex, newIndex);
      },
      getCurrentIndex: () => currentIndex,
    }));

    const WRAPPER_WIDTH = Math.round(100 * NUM_CARDS_TO_SHOW); // Assuming each thumbnail is 100px wide

    return (
      <div className="flex flex-row w-full">
        <PaginationButtonLeft onClick={() => setPaginationIndex(Math.max(0, paginationIndex - 1))} />
        <div
          className={clsx("relative w-full h-20 overflow-hidden bg-red-500", `max-w-[${WRAPPER_WIDTH}px]`)}
          ref={trackRef}
        >
          <div className={clsx("flex flex-row justify-center items-center h-full gap-1")}>
            {cards.map((card, index) => {
              const offset = index - currentIndex;

              return (
                <FlashcardThumbnail
                  key={index}
                  frontContent={card.frontContent}
                  backContent={card.backContent}
                />
              );
            })}
          </div>
        </div>
        <PaginationButtonRight onClick={() => setPaginationIndex(Math.min(Math.floor(totalCards / NUM_CARDS_TO_SHOW), paginationIndex + 1))} />
      </div>
    );
  },
);

FlashcardCarousel.displayName = "FlashcardCarousel";

export default FlashcardCarousel;
