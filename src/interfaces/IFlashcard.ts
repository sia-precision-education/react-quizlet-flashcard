export type FlipCallback = (() => void) | null;

export default interface FlashcardProps {
  /**
   * Unique identifier for the card
   */
  id?: number | string;
  /**
   * HTML string or JSX element to be displayed on the front of the card
   */
  frontHTML: string | JSX.Element;
  /**
   * CSS styles to be applied to the front side of the card
   */
  frontCardStyle?: React.CSSProperties;
  /**
   *  CSS styles to be applied to the content of the front side of the card
   */
  frontContentStyle?: React.CSSProperties;
  /**
   * HTML string or JSX element to be displayed on the back of the card
   */
  backHTML: string | JSX.Element;
  /**
   * CSS styles to be applied to the back side of the card
   */
  backCardStyle?: React.CSSProperties;
  /**
   * CSS styles to be applied to the content of the back side of the card
   */
  backContentStyle?: React.CSSProperties;
  /**
   * CSS class to be applied to the wrapper div
   */
  className?: string;
  /**
   * CSS height of the wrapper div
   */
  height?: string;
  /**
   * CSS border-radius of the wrapper div
   */
  borderRadius?: string;
  /**
   * CSS width of the wrapper div
   */
  width?: string;
  /**
   * CSS styles to be applied to the wrapper div
   */
  style?: React.CSSProperties;
  /**
   *  Callback function to be called when the card is flipped
   */
  onCardFlip?: (state: boolean) => void;
  /**
   * Ref object that exposes the flipCard function to manually control card flipping
   * @example
   * const flipRef = useRef<() => void>(null);
   * // Later: flipRef.current?.()
   */
  manualFlipRef?: React.MutableRefObject<FlipCallback>;
}
