import React, {   forwardRef, useEffect, useImperativeHandle, useRef, useState, useCallback } from "react";
import FlashcardArrayProps from "../../interfaces/IFlashcardArray";
import Flashcard from "../Flashcard/Flashcard";
import "./FlashcardArray.scss";

export interface FlashcardArrayRef {
  resetArray: () => void;
  changeCard: (index: number) => void;
}

export interface CardDisplayState {
  prev: number;
  current: number;
  next: number;
}

const ANIMATION_DELAY = 90;
const FLIP_OVERFLOW_DELAY = 3;

const FlashcardArray = forwardRef<FlashcardArrayRef, FlashcardArrayProps>(({
  cards,
  controls = true,
  showCount = true,
  onCardFlip = () => {},
  frontCardStyle = {},
  frontContentStyle = {},
  backCardStyle = {},
  backContentStyle = {},
  FlashcardArrayStyle = {},
  currentCardFlipRef,
  cycle = false,
}: FlashcardArrayProps, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOverFlow, setIsOverFlow] = useState("");

  const flashcardArrayRef = useRef<{
    resetArray: () => void;
    changeCard: (index: number) => void;
  }>(null);

  useImperativeHandle(ref, () => ({
    resetArray: flashcardArrayRef.current?.resetArray ?? (() => {}),
    changeCard: flashcardArrayRef.current?.changeCard ?? (() => {}),
  }));

  const placeFillerCard = (
    <Flashcard
      className="FlashcardArrayWrapper__empty"
      width="100%"
      backHTML=""
      frontHTML=""
    />
  );

  const cardsList = cards.map((card, index) => (
    <Flashcard
      id={card.id ?? index}
      key={index}
      frontHTML={card.frontHTML}
      backHTML={card.backHTML}
      manualFlipRef={
        currentIndex === index ? currentCardFlipRef : { current: null }
      }
      frontCardStyle={{ ...card.frontCardStyle, ...frontCardStyle }}
      frontContentStyle={{ ...card.frontContentStyle, ...frontContentStyle }}
      backCardStyle={{ ...card.backCardStyle, ...backCardStyle }}
      backContentStyle={{ ...card.backContentStyle, ...backContentStyle }}
      className={card.className}
      height={card.height || "100%"}
      width={card.width || "100%"}
      style={card.style}
      onCardFlip={(state) => {
        onCardFlip(card.id ?? index, index, state);
        setIsOverFlow("hidden");
        setTimeout(() => {
          setIsOverFlow("");
        }, 3);
      }}
    />
  ));

  const changeCard = (index: number) => {
    let newIndex = index;
    if (cycle) {
      newIndex = ((index % cards.length) + cards.length) % cards.length;
    } else {
      newIndex = Math.max(0, Math.min(index, cards.length - 1));
    }

    setIsOverFlow("hidden");
    setTimeout(() => {
      setIsOverFlow("");
    }, ANIMATION_DELAY);

    setCurrentIndex(newIndex);
  };

  const resetArray = () => {
    setCurrentIndex(0);
  };

  useEffect(() => {
    if (flashcardArrayRef.current) {
      flashcardArrayRef.current.resetArray = resetArray;
      flashcardArrayRef.current.changeCard = changeCard;
    }
  });

  return (
    <div className="FlashcardArrayWrapper" style={FlashcardArrayStyle}>
      <div className="FlashcardArrayWrapper__CardHolder" style={{ overflow: isOverFlow }}>
        {currentIndex > 0 || cycle ?
          cardsList[cycle ? (currentIndex - 1 + cards.length) % cards.length : currentIndex - 1]
          : placeFillerCard}
        {cardsList[currentIndex]}
        {currentIndex < cards.length - 1 || cycle ?
          cardsList[cycle ? (currentIndex + 1) % cards.length : currentIndex + 1]
          : placeFillerCard}
      </div>

      {(controls || showCount) && (
        <div className="FlashcardArrayWrapper__controls">
          {controls && (
            <button onClick={() => changeCard(currentIndex - 1)}>
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
          )}
          {showCount && (
            <span className="FlashcardArrayWrapper__controls--count">
              {currentIndex + 1}/{cardsList.length}
            </span>
          )}
          {controls && (
            <button onClick={() => changeCard(currentIndex + 1)}>
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
          )}
        </div>
      )}
    </div>
  );
});

export default FlashcardArray;