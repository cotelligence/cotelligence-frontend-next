import Image from 'next/image';
import Link from 'next/link';

import { MyButton } from '@/lib/comps/my-button';
import logoLoose from '@/lib/images/logo-loose.png';

const HomePage = () => {
  return (
    <div className="min-h-full">
      <div className="bg-[#F7F7F8]">
        <div className="flex items-center justify-center max-w-screen-2xl px-[50px] min-h-[calc(100vh-86px)] mx-auto">
          <Image priority alt="cotelligence" className="w-[90%]" src={logoLoose} />
        </div>
      </div>
      <div className="bg-primary text-primary-foreground">
        <div className="flex justify-center max-w-screen-xl gap-[130px] px-[50px] mx-auto py-[100px] items-center">
          <p className="text-2xl leading-9">
            Your AI model hub. Upload models, get APIs. Anyone can build with ease. Access
            decentralized computing power for economical model serving. Democratize AI
            adoption.
          </p>
          <div className="flex flex-col gap-12">
            <MyButton as={Link} color="secondary" href="/cp-nft">
              EXPLORE
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
