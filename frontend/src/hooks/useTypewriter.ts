import { useEffect, useState } from 'react';

const TYPING_MS = 85;
const DELETING_MS = 40;
const HOLD_MS = 1900;

/**
 * Cycles through `words`, typing and deleting one character at a time.
 * When disabled it simply returns the first word, so callers can switch the
 * animation off for reduced-motion users without changing their markup.
 */
export function useTypewriter(words: string[], enabled = true): string {
  const [wordIndex, setWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(words[0]?.length ?? 0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = words[wordIndex] ?? '';

  useEffect(() => {
    if (!enabled || words.length < 2) return;

    const isComplete = charCount === currentWord.length;
    let delay = TYPING_MS;
    if (isDeleting) delay = DELETING_MS;
    else if (isComplete) delay = HOLD_MS;

    const timer = setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true);
      } else if (isDeleting && charCount === 0) {
        setIsDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
      } else {
        setCharCount((count) => count + (isDeleting ? -1 : 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charCount, isDeleting, currentWord, words, enabled]);

  return enabled ? currentWord.slice(0, charCount) : words[0] ?? '';
}
