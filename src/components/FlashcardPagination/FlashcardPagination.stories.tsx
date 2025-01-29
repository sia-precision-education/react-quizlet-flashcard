import React from "react";
import { Meta, Story } from "@ladle/react";
import FlashcardPagination from "./FlashcardPagination";
import { FlashcardSyncProvider } from "@/contexts/FlashcardSyncContext";
import FlashcardArray from "../FlashcardArray/FlashcardArray";


const flashcards = [
  { frontHTML: "<h1>Front 1</h1>", backHTML: "<h1>Back 1</h1>" },
  { frontHTML: "<h1>Front 2</h1>", backHTML: "<h1>Back 2</h1>" },
  { frontHTML: "<h1>Front 3</h1>", backHTML: "<h1>Back 3</h1>" },
  { frontHTML: "<h1>Front 4</h1>", backHTML: "<h1>Back 4</h1>" },
  { frontHTML: "<h1>Front 5</h1>", backHTML: "<h1>Back 5</h1>" },
  { frontHTML: "<h1>Front 6</h1>", backHTML: "<h1>Back 6</h1>" },
  { frontHTML: "<h1>Front 7</h1>", backHTML: "<h1>Back 7</h1>" },
  { frontHTML: "<h1>Front 8</h1>", backHTML: "<h1>Back 8</h1>" },
  { frontHTML: "<h1>Front 9</h1>", backHTML: "<h1>Back 9</h1>" },
  { frontHTML: "<h1>Front 10</h1>", backHTML: "<h1>Back 10</h1>" },
].map((card, index) => ({
  ...card,
  id: index,
}));



const Template: Story = (args) => (
  <FlashcardSyncProvider>
    <FlashcardArray cards={flashcards} controls={false} />
    <FlashcardPagination {...args} />
  </FlashcardSyncProvider>
);

export const Default = Template.bind({});
Default.args = {
  className: "",
};