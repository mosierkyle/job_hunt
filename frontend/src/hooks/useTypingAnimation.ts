import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTypingAnimationProps {
  fullText: string;
  typingSpeed?: number;
  repeatDelay?: number | null;
}

const useTypingAnimation = ({
  fullText,
  typingSpeed = 100,
  repeatDelay = null,
}: UseTypingAnimationProps) => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const indexRef = useRef(0);

  const typeText = useCallback(() => {
    setText('');
    indexRef.current = 0;

    const addChar = () => {
      if (indexRef.current < fullText.length) {
        setText(fullText.slice(0, indexRef.current + 1));
        indexRef.current += 1;
        setTimeout(addChar, typingSpeed);
      }
    };

    addChar();
  }, [fullText, typingSpeed]);

  useEffect(() => {
    typeText();

    let intervalId: NodeJS.Timeout | null = null;

    if (repeatDelay !== null) {
      intervalId = setInterval(typeText, repeatDelay);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [typeText, repeatDelay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return { text, showCursor };
};

export default useTypingAnimation;
