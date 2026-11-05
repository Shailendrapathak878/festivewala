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
  const checkpointBeforeTypingRef = useRef<CardCustomization>(initialState);
  const isTypingSessionActiveRef = useRef<boolean>(false);

  const pushState = useCallback(
    (
      update: CardCustomization | Partial<CardCustomization>,
      immediate = false
    ) => {
      if (immediate) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
          debounceTimerRef.current = null;
        }
        isTypingSessionActiveRef.current = false;

        setState((prev) => {
          const nextPresent: CardCustomization =
            'title' in update && 'recipient' in update && 'message' in update
              ? (update as CardCustomization)
              : { ...prev.present, ...update };

          checkpointBeforeTypingRef.current = nextPresent;

          return {
            past: [...prev.past.slice(-MAX_HISTORY + 1), prev.present],
            present: nextPresent,
            future: [],
          };
        });
        return;
      }

      // Synchronously update present state immediately so typing and backspace have ZERO latency
      setState((prev) => {
        if (!isTypingSessionActiveRef.current) {
          checkpointBeforeTypingRef.current = prev.present;
          isTypingSessionActiveRef.current = true;
        }

        const nextPresent: CardCustomization =
          'title' in update && 'recipient' in update && 'message' in update
            ? (update as CardCustomization)
            : { ...prev.present, ...update };

        return {
          ...prev,
          present: nextPresent,
          future: [], // New user input invalidates forward redo history
        };
      });

      // Debounce committing the typing session baseline into the past undo stack (400ms)
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        setState((prev) => {
          const baseline = checkpointBeforeTypingRef.current;
          isTypingSessionActiveRef.current = false;
          checkpointBeforeTypingRef.current = prev.present;

          return {
            ...prev,
            past: [...prev.past.slice(-MAX_HISTORY + 1), baseline],
          };
        });
        debounceTimerRef.current = null;
      }, 400);
    },
    []
  );

  const undo = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    isTypingSessionActiveRef.current = false;

    setState((prev) => {
      if (prev.past.length === 0) return prev;
      const previous = prev.past[prev.past.length - 1];
      const newPast = prev.past.slice(0, prev.past.length - 1);
      checkpointBeforeTypingRef.current = previous;

      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    isTypingSessionActiveRef.current = false;

    setState((prev) => {
      if (prev.future.length === 0) return prev;
      const next = prev.future[0];
      const newFuture = prev.future.slice(1);
      checkpointBeforeTypingRef.current = next;

      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const reset = useCallback((defaultState: CardCustomization) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    isTypingSessionActiveRef.current = false;
    checkpointBeforeTypingRef.current = defaultState;

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
