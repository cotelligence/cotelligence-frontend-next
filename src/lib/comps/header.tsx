import { Link } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

import logo from '@/lib/images/logo.png';

import Connection from './connection';

const Header = () => {
  return (
    <header className="border-b border-divider h-[86px]">
      <div className="flex items-center gap-7 h-full w-full max-w-screen-2xl px-[50px] mx-auto">
        <Link href="/">
          <Image alt="cotelligence" className="w-[140px]" src={logo} />
        </Link>
        <div className="flex items-center gap-7 font-semibold">
          <Link color="foreground" href="/cp-nft" size="lg">
            CP-NFT
          </Link>
          <Link color="foreground" href="/models" size="lg">
            MODELS
          </Link>
          <Link color="foreground" href="/docs" size="lg">
            DOCS
          </Link>
        </div>
        <Connection />
      </div>
    </header>
  );
};

export default Header;
