import React, { useState, useMemo, useRef, useImperativeHandle } from "react";
import FlashcardProps, { FlashcardRef } from "./types";
import "./Flashcard.scss";
import clsx from "clsx";


const Flashcard = React.forwardRef<FlashcardRef, FlashcardProps>(({
  frontHTML,
  frontCardStyle = "",
  frontContentStyle = "",

  backHTML,
  backCardStyle = "",
  backContentStyle = "",

  className,
  style,
  onCardFlip = (state = false) => { },
}: FlashcardProps, ref) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const internalRef = useRef<HTMLDivElement>(null);

  const handleFlip = () => {
    setIsFlipped(prev => {
      const newFlipState = !prev;
      onCardFlip(newFlipState);
      return newFlipState;
    });
  }

  useImperativeHandle(ref, () => ({
    onManualFlip: handleFlip,
    isFlipped: isFlipped
  }));

  // const getCursorStyle = () => {
  //   if (manualFlipRef.current) {
  //     return "default";
  //   }
  //   return "pointer";
  // };


  const { front, back } = useMemo(() => {
    return {
      front: { content: frontHTML, style: frontCardStyle, contentStyle: frontContentStyle },
      back: { content: backHTML, style: backCardStyle, contentStyle: backContentStyle },
    };
  }, [frontHTML, backHTML, frontCardStyle, backCardStyle]);

  return (
    <div
      className={`FlashcardWrapper ${className}`}
      ref={internalRef}
      style={{
        // border: "1px solid #000",
        borderRadius: "1rem",
        ...style
      }}
    >
      <div
        className={`FlashcardWrapper__item ${isFlipped ? "FlashcardWrapper__item--flip" : ""}`}
        onClick={handleFlip}
      >
        <FlashcardContent side="front" content={front.content} style={front.style} contentStyle={front.contentStyle} />
        <FlashcardContent side="back" content={back.content} style={back.style} contentStyle={back.contentStyle} />
      </div>
    </div>
  );
});


interface FlashcardSide {
  side: "front" | "back";
  content: string | JSX.Element;
  style?: React.CSSProperties | string;
  contentStyle?: React.CSSProperties | string;
}


function FlashcardContent({
  side,
  content,
  style,
  contentStyle
}: FlashcardSide) {

  const contentStyleObj: React.CSSProperties = typeof contentStyle === "string" ? { [contentStyle]: "true" } : contentStyle || {};
  const styleObj: React.CSSProperties = typeof style === "string" ? { [style]: "true" } : style || {};

  const contentStyleString = typeof contentStyle === "string" ? contentStyle : ""; // belongs in className
  const styleString = typeof style === "string" ? style : "";

  return(
  <div className={`FlashcardWrapper__item--${side}`} style={styleObj}>
    {
      React.isValidElement(content) ?
        <div className={clsx("FlashcardWrapper__item--content", contentStyleString)} style={contentStyleObj}>{content}</div> :
        <div className={clsx("FlashcardWrapper__item--content", contentStyleString)} dangerouslySetInnerHTML={{ __html: content }} style={contentStyleObj} />
    }

  </div>

)
}

export default Flashcard;
