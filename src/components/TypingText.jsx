import { useEffect, useState } from "react";

export default function TypingText({
  text,
  className = "",
  speed = 45,
  startDelay = 0,
  onDone,
}) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          onDone?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span className={className}>
      {shown}
      <span className="inline-block w-[3px] h-[0.9em] bg-[var(--color-accent)] ml-1 align-middle animate-pulse-slow" />
    </span>
  );
}
