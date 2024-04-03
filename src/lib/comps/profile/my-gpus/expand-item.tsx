import { Image, Snippet } from '@nextui-org/react';
import React, { FC, ReactNode, useMemo } from 'react';

import { RunpodStatus, TokenAsset } from '@/lib/types';

import { MyButton } from '../../my-button';
import { useOperationModal } from './operation-modal';
import { useTransferModal } from './transfer-modal';

const FILENAME = 'id_ed25519.pem';

const ExpandItem: FC<{ data: TokenAsset }> = ({ data: { tokenInfo, metadata } }) => {
  const items = useMemo<Array<{ content: ReactNode; label: string }>>(() => {
    const portReady = !!tokenInfo.runpodPrivateKey;
    const ipReady = !!tokenInfo.runpodPort && !!tokenInfo.runpodPublicIp;

    const filename = `${tokenInfo.runpodId}_${FILENAME}`;

    const handleDownload = async () => {
      const alink = document.createElement('a');

      alink.download = filename;
      alink.href = `data:text/plain;charset=utf-8,${encodeURIComponent(tokenInfo!.runpodPrivateKey)}`;

      alink.classList.add('!hidden');

      document.body.appendChild(alink);

      alink.click();
      setTimeout(() => alink.remove());
    };

    return [
      {
        label: 'IP',
        content: tokenInfo.runpodPublicIp,
      },
      {
        label: 'Port',
        content: tokenInfo.runpodPort,
      },
      {
        label: 'Host ID',
        content: tokenInfo.runpodHostId,
      },
      {
        label: 'Private Key',
        content: portReady && (
          <MyButton size="sm" onPress={handleDownload}>
            Download
          </MyButton>
        ),
      },
      {
        label: 'Terminal',
        content: portReady && (
          <Snippet
            classNames={{
              pre: 'whitespace-normal break-all',
            }}
            size="sm"
          >{`chmod 400 ${filename}`}</Snippet>
        ),
      },
      {
        label: '',
        content: ipReady && (
          <Snippet
            classNames={{
              pre: 'whitespace-normal break-all',
            }}
            size="sm"
          >
            {`ssh root@${tokenInfo.runpodPublicIp} -p ${tokenInfo.runpodPort} -i ${filename}`}
          </Snippet>
        ),
      },
    ];
  }, [tokenInfo]);

  const handleTransfer = () =>
    useTransferModal.setState({ open: true, tokenIds: [tokenInfo.id] });

  const handleBond = () =>
    useOperationModal.setState({
      open: true,
      payload: { tokenId: tokenInfo.id, type: 'bond' },
    });

  const handleActivate = () =>
    useOperationModal.setState({
      open: true,
      payload: { tokenId: tokenInfo.id, type: 'activate' },
    });

  return (
    <div className="flex gap-3">
      <Image
        alt=""
        className="object-cover w-full h-full"
        classNames={{
          wrapper: 'bg-black/5 !max-w-none flex-none w-[145px] h-[145px]',
        }}
        radius="none"
        src={metadata?.image}
      />
      <div className="w-full grid auto-rows-max content-between min-h-[145px] gap-2">
        <div className="grid grid-cols-2 grid-flow-col grid-rows-3 gap-x-4">
          {items.map(({ label, content }) => (
            <div key={label} className="flex gap-2">
              <p className="flex-1 basis-1/3 text-[#4D4D4D]">{label}</p>
              <div className="flex-1 basis-2/3 empty:after:content-['-']">{content}</div>
            </div>
          ))}
        </div>
        <i className="w-full h-0 border-t border-divider" />
        <div className="flex gap-9">
          <MyButton onPress={handleTransfer}>Transfer</MyButton>
          {tokenInfo.runpodStatus === RunpodStatus.NotStarted && (
            <>
              <MyButton onPress={handleBond}>Bond</MyButton>
              <MyButton onPress={handleActivate}>Activate</MyButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpandItem;
