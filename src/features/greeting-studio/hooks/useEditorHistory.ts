import { useState, useCallback, useRef } from 'react';
import type { CardCustomization } from '../types/editor';

const MAX_HISTORY = 30;

interface HistoryState {
  past: CardCustomization[];
  present: CardCustomization;
  future: CardCustomization[];
}

export function useEditorHistory(initialState: CardCustomization) {
  const [state, setState] = useState<HistoryState>({
    past: [],
    present: initialState,
    future: [],
  });

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pushState = useCallback((newState: CardCustomization, immediate = false) => {
    if (immediate) {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      setState((prev) => ({
        past: [...prev.past.slice(-MAX_HISTORY + 1), prev.present],
        present: newState,
        future: [],
      }));
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setState((prev) => ({
        past: [...prev.past.slice(-MAX_HISTORY + 1), prev.present],
        present: newState,
        future: [],
      }));
    }, 250);
  }, []);

  const undo = useCallback(() => {
    setState((prev) => {
      if (prev.past.length === 0) return prev;
      const previous = prev.past[prev.past.length - 1];
      const newPast = prev.past.slice(0, prev.past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((prev) => {
      if (prev.future.length === 0) return prev;
      const next = prev.future[0];
      const newFuture = prev.future.slice(1);
      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const reset = useCallback((defaultState: CardCustomization) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    setState({
      past: [],
      present: defaultState,
      future: [],
    });
  }, []);

  return {
    customization: state.present,
    pushState,
    undo,
    redo,
    reset,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    historyLength: state.past.length,
  };
}
