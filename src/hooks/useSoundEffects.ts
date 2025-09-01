"use client";

import { useCallback } from "react";

export const useSoundEffects = () => {
  const playBeep = useCallback(
    (frequency: number = 800, duration: number = 100) => {
      if (typeof window === "undefined") return;

      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = "square"; // Retro square wave

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + duration / 1000
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    },
    []
  );

  const playSuccess = useCallback(() => {
    playBeep(1000, 150);
    setTimeout(() => playBeep(1200, 150), 100);
  }, [playBeep]);

  const playError = useCallback(() => {
    playBeep(400, 200);
    setTimeout(() => playBeep(300, 200), 150);
  }, [playBeep]);

  const playClick = useCallback(() => {
    playBeep(600, 50);
  }, [playBeep]);

  const playTyping = useCallback(() => {
    playBeep(800, 30);
  }, [playBeep]);

  return {
    playBeep,
    playSuccess,
    playError,
    playClick,
    playTyping,
  };
};
