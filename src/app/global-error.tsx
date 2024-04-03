'use client';

import { useEffect } from 'react';

import { MyButton } from '@/lib/comps/my-button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error, 'root');
  }, [error]);

  return (
    <html>
      <body>
        <div className="max-w-screen-2xl min-h-screen p-[50px] flex gap-4 flex-col mx-auto">
          <h2 className="text-5xl">Something went wrong!</h2>
          <MyButton className="w-max" onPress={reset}>
            Try again
          </MyButton>
        </div>
      </body>
    </html>
  );
}
