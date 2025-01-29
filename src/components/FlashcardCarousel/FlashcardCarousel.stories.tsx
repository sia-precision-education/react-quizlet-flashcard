import type { Story } from "@ladle/react";
import { useRef } from "react";
import FlashcardCarousel, { FlashcardCarouselRef } from "./FlashcardCarosel";
import FlashcardArray from "../FlashcardArray/FlashcardArray";
import { FlashcardSyncProvider } from "@/contexts/FlashcardSyncContext";
import { FlashcardThumbnail } from "./FlashcardCarosel";

const sampleCards = [
  { frontHTML: "<p>What is the <u>capital</u> of Alaska?</p>", backHTML: "Juneau" },
  { frontHTML: "What is the capital of California?", backHTML: "Sacramento" },
  { frontHTML: "What is the capital of New York?", backHTML: "Albany" },
  { frontHTML: "What is the capital of Florida?", backHTML: "Tallahassee" },
  { frontHTML: "What is the capital of Texas?", backHTML: "Austin" },
  { frontHTML: "What is the capital of New Mexico?", backHTML: "Santa Fe" },
  { frontHTML: "What is the capital of Arizona?", backHTML: "Phoenix" },
].map((card, index) => ({ ...card, id: index }));

export const SynchronizedFlashcards: Story = () => {
  const carouselRef = useRef<FlashcardCarouselRef | null>(null);

  return (
    <div className="storyContainer">
      <FlashcardSyncProvider initialTotalCards={sampleCards.length}>
        <FlashcardArray cards={sampleCards} frontCardStyle="border-2 border-gray-500" backCardStyle="border-2 border-gray-500" />
        <FlashcardCarousel ref={carouselRef}>
          <div className="flex gap-2 justify-center mt-4">
            <button
              className="bg-gray-500/50 hover:bg-blue-700 hover:cursor-pointer text-white py-1 px-4 rounded"
              onClick={() => carouselRef.current?.prev()}
            >
              Prev
            </button>
            <button
              className="bg-gray-500/50 hover:bg-blue-700 hover:cursor-pointer text-white py-1 px-4 rounded"
              onClick={() => carouselRef.current?.next()}
            >
              Next
            </button>
          </div>
        </FlashcardCarousel>
      </FlashcardSyncProvider>
    </div>
  );
};


export const FlashcardThumbnailStory: Story = () => {
  return (
    <div className="flex gap-4">
      <FlashcardThumbnail
        frontContent="<p>What is the <u>capital</u> of Alaska?</p>"
        backContent="Juneau"
        header="Question 1"
        className="border-2 border-gray-500"
      />
      <FlashcardThumbnail
        frontContent="What is the capital of California?"
        backContent="Sacramento"
        header="Question 2"
        className="border-2 border-gray-500"
      />
      <FlashcardThumbnail
        frontContent="What is the capital of New York?"
        backContent="Albany"
        header="Question 3"
        className="border-2 border-gray-500"
      />
    </div>
  );
};

