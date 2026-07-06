"use client";

import { useEffect, useRef, useState } from "react";

export default function BGMPlayer() {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started) return;
    const handler = () => {
      el.play().catch(() => {});
      setPlaying(true);
      setStarted(true);
    };
    document.addEventListener("click", handler, { once: true });
    return () => document.removeEventListener("click", handler);
  }, [started]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      el.pause();
    } else {
      el.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={ref} src="/music.mp3" loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed bottom-5 left-5 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur transition hover:bg-white"
      >
        {playing ? "🔊" : "🔇"}
      </button>
    </>
  );
}
