import React, {
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useContext,
} from "react";
import FlashcardArrayProps from "./types";
import Flashcard from "../Flashcard/Flashcard";
import clsx from "clsx";
import "./FlashcardArray.scss";

import type { FlashcardArrayRef } from "./types";
import type { FlashcardRef } from "../Flashcard/types";
import assert from "assert";
import { useFlashcardSync, FlashcardSyncContext } from "@/contexts/FlashcardSyncContext";
import { FlashcardSyncProvider } from "@/contexts/FlashcardSyncContext";

const useFlashcardSyncExists = () => {
  const context = useContext(FlashcardSyncContext);
  return context !== null && context !== undefined;
};

const FlashcardArrayInternal = forwardRef<
  FlashcardArrayRef,
  FlashcardArrayProps
>(({
  cards,
  controls = true,
  showCount = true,
  onCardFlip = () => {},
  frontCardStyle,
  frontContentStyle,
  backCardStyle,
  backContentStyle,
  cycle = false,
}: FlashcardArrayProps, ref) => {
  const { currentIndex, setCurrentIndex, flipStates, toggleFlip, setTotalCards, setCards } = useFlashcardSync();
  const [isOverFlow, setIsOverFlow] = useState("");

  const cardRefs = useRef<(FlashcardRef | null)[]>([]);


  useEffect(() => {
    cardRefs.current = Array(cards.length).fill(null);
  }, [cards.length]);

  useEffect(() => {
    setTotalCards(cards.length);
    setCards(cards.map((card) => ({ frontContent: card.frontHTML as string, backContent: card.backHTML as string })));
  }, [cards.length, setTotalCards, setCards]);

  const placeFillerCard = (
    <Flashcard
      className="FlashcardArrayWrapper__empty"
      width="100%"
      backHTML=""
      frontHTML=""
      frontCardStyle={frontCardStyle || ""}
      frontContentStyle={frontContentStyle || ""}
      backCardStyle={backCardStyle || ""}
      backContentStyle={backContentStyle || ""}
    />
  );

  const mergeStyles = (style: React.CSSProperties | string, defaultStyle: React.CSSProperties | string) => {
    if (typeof style === "string" || typeof defaultStyle === "string") {
      const styleClass = typeof style === "string" ? style : "";
      const defaultStyleClass = typeof defaultStyle === "string" ? defaultStyle : "";
      return clsx(styleClass, defaultStyleClass);
    }

    return { ...defaultStyle, ...style };
  }

  const cardsList = cards.map((card, index) => {
    return (
      <Flashcard
        key={index}
        ref={(el) => {
          cardRefs.current[index] = el;
        }}
        frontHTML={card.frontHTML}
        backHTML={card.backHTML}
        frontCardStyle={mergeStyles(card.frontCardStyle || "", frontCardStyle || "")}
        frontContentStyle={mergeStyles(card.frontContentStyle || "", frontContentStyle || "")}
        backCardStyle={mergeStyles(card.backCardStyle || "", backCardStyle || "")}
        backContentStyle={mergeStyles(card.backContentStyle || "", backContentStyle || "")}
        className={clsx(card.className, "h-full w-full")}
        style={card.style}
        onCardFlip={(state) => {
          handleCardFlip(card.id, index, state);
          setIsOverFlow("hidden");
          setTimeout(() => {
            setIsOverFlow("");
          }, 3);
        }}
      />
    );
  });

  const handleCardFlip = (cardId: string | number, index: number, state: boolean) => {
    toggleFlip(index);
    onCardFlip(cardId, index, state);
  };

  useImperativeHandle(ref, () => ({
    totalCards: cards.length,
    currentIndex: currentIndex,
    resetArray: () => {
      setCurrentIndex(0);
    },
    changeCard: (
      callback: (index: number, totalCards: number) => number,
      cycle: boolean,
    ) => {
      changeCard(callback, cycle);
    },
    flipCurrentCard: () => {
      const currentCard = cardRefs.current[currentIndex];
      if (currentCard) {
        currentCard.onManualFlip();
      }
    },
  }));

  function changeCard(
    callback: (index: number, totalCards: number) => number,
    cycle: boolean = false,
  ) {
    const newIndex = callback(currentIndex, cards.length);

    const isAtBoundary = !cycle && (
      (newIndex >= cards.length && currentIndex === cards.length - 1) ||
      (newIndex < 0 && currentIndex === 0)
    );

    if (!isAtBoundary) {
      setIsOverFlow("hidden");
      setTimeout(() => {
        setIsOverFlow("");
      }, 300);
    }

    if (cycle) {
      if (newIndex >= cards.length) {
        setCurrentIndex(0);
      } else if (newIndex < 0) {
        setCurrentIndex(cards.length - 1);
      } else {
        setCurrentIndex(newIndex);
      }
    } else {
      setCurrentIndex(Math.max(0, Math.min(newIndex, cards.length - 1)));
    }
  }


  return (
    <div className="FlashcardArrayWrapper">
      <div
        className="FlashcardArrayWrapper__CardHolder"
        style={{ overflow: isOverFlow }}
      >
        {currentIndex - 1 >= 0
          ? cardsList[currentIndex - 1]
          : (cycle ? cardsList[cards.length - 1] : placeFillerCard)}
        {cardsList[currentIndex]}
        {currentIndex + 1 < cards.length
          ? cardsList[currentIndex + 1]
          : (cycle ? cardsList[0] : placeFillerCard)}
      </div>

      {(controls) && (
        <div className="FlashcardArrayWrapper__controls">
          <button
            onClick={() => changeCard((index) => index - 1, cycle)}
            className={clsx({ "hidden": !controls })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={{ height: "24px", width: "24px" }}
            >
              <path
                d="M19 12a1 1 0 0 1-1 1H8.414l1.293 1.293a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L8.414 11H18a1 1 0 0 1 1 1z"
                style={{ fill: "#1c1b1e", height: "24px", width: "24px" }}
                data-name="Left"
              />
            </svg>
          </button>

          <FlashcardArrayCount
            cardNumber={currentIndex}
            cardsList={cardsList}
            showCount={showCount}
          />

          <button
            onClick={() => changeCard((index) => index + 1, cycle)}
            className={clsx({ "hidden": !controls })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={{ height: "24px", width: "24px" }}
            >
              <path
                d="m18.707 12.707-3 3a1 1 0 0 1-1.414-1.414L15.586 13H6a1 1 0 0 1 0-2h9.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414z"
                style={{ fill: "#1c1b1e", height: "24px", width: "24px" }}
                data-name="Right"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
});

function FlashcardArrayCount(
  { cardNumber, cardsList, showCount = false }: {
    cardNumber: number;
    cardsList: JSX.Element[];
    showCount: boolean;
  },
) {
  if (!showCount) return null;
  return (
    <span className="FlashcardArrayWrapper__controls--count">
      {cardNumber + 1}/{cardsList.length}
    </span>
  );
}

/**
 * FlashcardArrayCount Component
 *
 * This component displays the current card number and the total number of cards in the FlashcardArray.
 *
 * Props:
 * - cardNumber: The index of the current card being displayed.
 * - cardsList: The list of card elements in the FlashcardArray.
 * - showCount: A boolean indicating whether to show the card count.
 *
 * Example usage:
 *
 * <FlashcardArrayCount
 *   cardNumber={currentIndex}
 *   cardsList={cardsList}
 *   showCount={showCount}
 * />

*/

const FlashcardArray = forwardRef<FlashcardArrayRef, FlashcardArrayProps>((props, ref) => {
  const providerExists = useFlashcardSyncExists();
  if (!providerExists) {
    return <FlashcardSyncProvider><FlashcardArrayInternal ref={ref} {...props} /></FlashcardSyncProvider>;
  }
  return <FlashcardArrayInternal ref={ref} {...props} />;
});

export default FlashcardArray;
