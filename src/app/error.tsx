'use client'; // Error components must be Client Components

import { useEffect } from 'react';

import { MyButton } from '@/lib/comps/my-button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-screen-2xl min-h-full p-[50px] flex gap-4 flex-col mx-auto">
      <h2 className="text-5xl">Something went wrong!</h2>
      <MyButton className="w-max" onPress={reset}>
        Try again
      </MyButton>
    </div>
  );
}
