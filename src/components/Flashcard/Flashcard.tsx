import React, { useState, useCallback, useImperativeHandle, forwardRef, useRef } from "react";
import FlashcardProps from "../../interfaces/IFlashcard";
import "./Flashcard.scss";

// added
// manualFlipRef?: React.MutableRefObject<() => void>;
// borderRadius?: string;
// jsx elements for frontHTML and backHTML

// removed
// default styles like padding, border radius and flex alignment for content

const Flashcard = forwardRef(({
  frontHTML,
  frontCardStyle,
  frontContentStyle,
  backHTML,
  backCardStyle,
  backContentStyle,
  style,
  height,
  borderRadius = "1rem",
  width,
  className,
  onCardFlip = ((state: boolean = false) => {}),
}: FlashcardProps, ref) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const manualFlipRef = useRef<() => void>(null);

  useImperativeHandle(ref, () => ({
    onManualFlip: () => {
      setIsFlipped(!isFlipped);
      onCardFlip(!isFlipped);
    },
  }));


  function onManualFlip() {
    setIsFlipped(!isFlipped);
    onCardFlip(!isFlipped);
  }

  if (manualFlipRef.current !== null) {
    manualFlipRef.current = onManualFlip;
  }

  const renderContent = useCallback(
    (content: React.ReactNode | string, contentStyle?: React.CSSProperties) => {
      if (typeof content === "string") {
        return (
          <div
            className="FlashcardWrapper__item--content"
            dangerouslySetInnerHTML={{ __html: content }}
            style={contentStyle}
          />
        );
      }

      return (
        <div className="FlashcardWrapper__item--content" style={contentStyle}>
          {content}
        </div>
      );
    },
    []
  );

  const getCursorStyle = () => {
    if (manualFlipRef.current) {
      return "default";
    }
    return "pointer";
  };

  const handleClick = () => {
    if (manualFlipRef.current) {
      return;
    }

    const newFlipState = !isFlipped;
    setIsFlipped(newFlipState);
    onCardFlip(newFlipState);
  };

  const getFlipClassName = () => {
    const baseClass = "FlashcardWrapper__item";
    if (isFlipped) {
      return `${baseClass} ${baseClass}--flip`;
    }
    return baseClass;
  };

  return (
    <div
      className={`FlashcardWrapper ${className}`}
      style={{
        height: height,
        width: width,
        ...style,
      }}
    >
      <div
        className={getFlipClassName()}
        style={{
          borderRadius: borderRadius,
        }}
        onClick={handleClick}
      >
        <div
          className="FlashcardWrapper__item--front"
          style={{
            ...frontCardStyle,
            cursor: getCursorStyle(),
          }}
        >
          {renderContent(frontHTML, frontContentStyle)}
        </div>
        <div
          className="FlashcardWrapper__item--back"
          style={{
            ...backCardStyle,
            cursor: getCursorStyle(),
          }}
        >
          {renderContent(backHTML, backContentStyle)}
        </div>
      </div>
    </div>
  );
});

export default Flashcard;