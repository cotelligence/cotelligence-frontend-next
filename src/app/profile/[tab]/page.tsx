import { notFound } from 'next/navigation';

import MyAssets, { AssetTabType } from '@/lib/comps/profile/my-assets';

const ProfilePage = ({ params: { tab } }: { params: { tab: string } }) => {
  if (!(['my-gpus', 'my-bonds'] as AssetTabType[]).includes(tab as any)) {
    notFound();
  }

  return <MyAssets />;
};

export default ProfilePage;
