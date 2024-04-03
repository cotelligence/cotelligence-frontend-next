import React, { useEffect, useRef, useState } from 'react';

import { useOutputState } from './output-section';

const TextTyper = () => {
  const ref = useRef<HTMLSpanElement>(null);

  const { text = '', loading } = useOutputState();

  const [typing, setTyping] = useState(loading);

  const currentIndex = useRef(text.length ?? 0);

  useEffect(() => {
    ref.current!.textContent = text;
  }, []);

  useEffect(() => {
    const pEle = ref.current!;

    setTyping(true);

    const targetLength = text.length;

    const animate = () => {
      console.log('animating');
      cancelAnimationFrame(timer);
      if (currentIndex.current > targetLength) {
        setTyping(false);

        return;
      }

      pEle.textContent = text.slice(0, (currentIndex.current += 3));

      timer = requestAnimationFrame(animate);
    };

    let timer = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(timer);
    };
  }, [text]);

  return (
    <p className="whitespace-pre-line">
      <span ref={ref} />
      {(loading || typing) && <span className="animate-blink">|</span>}
    </p>
  );
};

export default TextTyper;
