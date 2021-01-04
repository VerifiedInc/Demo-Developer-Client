import React, { FC } from 'react';

export interface DeeplinkButtonProps {
  deeplink: string;
}

const DeeplinkButton: FC<DeeplinkButtonProps> = ({ deeplink = '' }) => {
  if (!deeplink) return null;
  return <a className='deeplink-button' href={deeplink}>Deep Link</a>;
};

export default DeeplinkButton;
