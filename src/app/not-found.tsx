import { Link } from '@nextui-org/react';

import { MyButton } from '@/lib/comps/my-button';

export default function NotFound() {
  return (
    <div className="max-w-screen-2xl min-h-full p-[50px] flex gap-4 flex-col mx-auto">
      <h2 className="text-5xl">Not Found</h2>
      <p className="text-lg">Could not find requested resource</p>
      <MyButton as={Link} className="w-max" href="/">
        Return Home
      </MyButton>
    </div>
  );
}
