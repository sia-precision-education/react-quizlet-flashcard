import React, { useState, useCallback, useEffect } from "react";
import FlashcardProps from "../../interfaces/IFlashcard";
import "./Flashcard.scss";

// added
// manualFlipRef?: React.MutableRefObject<() => void>;
// borderRadius?: string;
// jsx elements for frontHTML and backHTML

// removed
// default styles like padding, border radius and flex alignment for content

type ManualFlipRef = React.MutableRefObject<(() => void) | null>;

type HTMLContent = string | React.ReactNode;

interface CardSideProps {
  content: HTMLContent;
  cardStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  isClickable: boolean;
}

function CardSide({ content, cardStyle, contentStyle, isClickable }: CardSideProps) {
  return (
    <div
      className="FlashcardWrapper__item--side"
      style={{
        ...cardStyle,
        cursor: isClickable ? "pointer" : "default",
      }}
    >
      {typeof content !== "string" ? (
        <div className="FlashcardWrapper__item--content" style={contentStyle}>
          {content}
        </div>
      ) : (
        <div
          className="FlashcardWrapper__item--content"
          dangerouslySetInnerHTML={{ __html: content }}
          style={contentStyle}
        />
      )}
    </div>
  );
}

function Flashcard({
  frontHTML,
  frontCardStyle,
  frontContentStyle,
  backHTML,
  backCardStyle,
  backContentStyle,
  className = "",
  style,
  height,
  borderRadius = "1rem",
  width,
  onCardFlip = () => {},
  manualFlipRef = { current: null } as ManualFlipRef,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
    onCardFlip(!isFlipped);
  }, [isFlipped, onCardFlip]);

  // Set up manual flip ref
  useEffect(() => {
    if (manualFlipRef.current !== null) {
      manualFlipRef.current = handleFlip;
    }
  }, [handleFlip, manualFlipRef]);

  const isManualFlip = typeof manualFlipRef.current === 'function';

  return (
    <div
      className={`FlashcardWrapper ${className}`.trim()}
      style={{
        height,
        width,
        ...style,
      }}
    >
      <div
        className={`FlashcardWrapper__item ${isFlipped ? "FlashcardWrapper__item--flip" : ""}`.trim()}
        style={{ borderRadius }}
        onClick={() => !isManualFlip && handleFlip()}
      >
        <CardSide
          content={frontHTML}
          cardStyle={frontCardStyle}
          contentStyle={frontContentStyle}
          isClickable={!isManualFlip}
        />
        <CardSide
          content={backHTML}
          cardStyle={backCardStyle}
          contentStyle={backContentStyle}
          isClickable={!isManualFlip}
        />
      </div>
    </div>
  );
}

export default Flashcard;
