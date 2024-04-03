import { notFound } from 'next/navigation';
import React, { FC } from 'react';

import { getModels } from '@/lib/apis/get-models';
import Model from '@/lib/comps/model';

const ModelPage: FC<{
  params: { uuid: string };
}> = async ({ params: { uuid } }) => {
  const models = await getModels();

  const model = models.find((item) => item.uuid === uuid);

  if (!model) {
    notFound();
  }

  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 grid-rows-[max-content,minmax(0,1fr)] h-[calc(100vh-136px)]">
      <div className="px-[50px] border-b border-divider h-24 flex items-center gap-4">
        <i className="bg-[#535353] rounded-full h-10 w-10" />
        <div className="font-medium">
          <h2 className="text-xl mb-1">{model.name}</h2>
          <p className="text-xs">{model.type}</p>
        </div>
      </div>
      <Model key={model.name} info={model} />
    </div>
  );
};

export default ModelPage;

export const revalidate = 60;
