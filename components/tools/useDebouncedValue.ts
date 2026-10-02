'use client';

import { useEffect, useState } from 'react';

// Returns `value` once it has stopped changing for `delay` ms. Used for live
// previews: re-rendering the preview (an iframe reload in the PDF tool) on every
// keystroke made typing slow (INP ~210ms in field data), while one update per
// typing pause keeps keystrokes cheap. useDeferredValue can't help there because
// the iframe reload itself is not interruptible.
export function useDebouncedValue<T>(value: T, delay = 200): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

// Resolves after the browser has painted the current frame, so a loading state
// set just before heavy synchronous work (PDF/Word generation) shows first.
export function nextPaint(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)));
}
