import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from 'react';

export interface ElementSize {
  width: number;
  height: number;
}

export function useElementSize<T extends HTMLElement>(): [RefObject<T | null>, ElementSize] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  const measure = useCallback((node: T | null) => {
    if (!node) return;
    const { width, height } = node.getBoundingClientRect();
    setSize((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
  }, []);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    measure(node);

    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => measure(node));
    observer.observe(node);
    return () => observer.disconnect();
  }, [measure]);

  return [ref, size];
}
