import { useRef } from "react";
import type { Story } from "@ladle/react";
import clsx from "clsx";
import "./storyStyle.scss";

import Flashcard from "../components/Flashcard/Flashcard";

export const BasicFlashcard: Story = () => {
  return (
    <div className="storyContainer">
      <Flashcard frontHTML="<h1>Front</h1>" backHTML={<h1>Back</h1>} />
    </div>
  );
};

export const ManualFlip: Story = () => {
  const flipRef = useRef<() => void>(() => {});

  return (
    <div className="storyContainer">
      <Flashcard
        frontHTML="<h1>Front</h1>"
        backHTML={<h1>Back</h1>}
        frontCardStyle={{
          backgroundColor: "blue",
          borderRadius: "10px",
          color: "white",
          display: "grid",
          fontSize: "2rem"
        }}
        backCardStyle={{
          backgroundColor: "green",
          color: "white",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        manualFlipRef={flipRef}
      />
      <button
        style={{ marginTop: "10px", padding: "10px", width: "10em" }}
        onClick={() => flipRef.current?.()}
      >
        Flip
      </button>
    </div>
  );
};

export const CustomStyles: Story = () => {
  const numberSpanClass = clsx(
    'flex',
    'items-center',
    'justify-center'
  );

  return (
    <div className="storyContainer">
      <Flashcard
        frontHTML={
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <span key={num} className={numberSpanClass}>
                {num}
              </span>
            ))}
          </>
        }
        backHTML={<h1>Back</h1>}
        backContentStyle={{
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        frontContentStyle={{
          backgroundColor: "turquoise",
          color: "white",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          fontSize: "2rem",
        }}
      />
    </div>
  );
};

export const CardFlipCallback: Story = () => {
  return (
    <div className="storyContainer">
      <Flashcard
        frontHTML="<h1>Check console</h1>"
        backHTML={<h1>Back</h1>}
        onCardFlip={(state) => {
          if (state) console.log("Card is flipped");
          else console.log("Card is not flipped");
        }}
      />
    </div>
  );
};

export const CustomCardSize: Story = () => {
  return (
    <div className="storyContainer">
      <Flashcard
        frontHTML="<h1>Front</h1>"
        backHTML={<h1>Back</h1>}
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
};
