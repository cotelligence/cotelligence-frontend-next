import { Link } from '@nextui-org/react';
import React from 'react';

import { getModels } from '@/lib/apis/get-models';

const ModelsPage = async () => {
  const modelInfos = await getModels();

  return (
    <div className="max-w-screen-2xl min-h-full px-[50px] mx-auto font-medium grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-[90px] py-40 content-center justify-center place-items-center">
      {modelInfos.map((info) => (
        <Link key={info.uuid} className="w-full flex-col" href={`/models/${info.uuid}`}>
          <span className="bg-[#383838] aspect-[7/9] w-full text-xl flex items-center justify-center rounded-sm text-primary-foreground">
            {info.name}
          </span>
          <span className="mt-4">{info.type}</span>
        </Link>
      ))}
    </div>
  );
};

export default ModelsPage;

export const revalidate = 60;
