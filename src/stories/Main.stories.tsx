import type { Story } from "@ladle/react";
import Flashcard from "../components/Flashcard/Flashcard";
import FlashcardArray from "../components/FlashcardArray/FlashcardArray";

export const Main: Story = () => {
  const cards = [
    {
      frontHTML: "<h1>Front</h1>",
      backHTML: "<h1>Back</h1>"
    }
  ];
  return (
    <div>
      <FlashcardArray cards={cards} />
    </div>
  );
};
