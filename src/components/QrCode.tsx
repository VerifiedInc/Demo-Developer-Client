import React, { FC } from 'react';

export interface QrCodeProps {
  qrCodeUrl: string;
}

const QrCode: FC<QrCodeProps> = ({ qrCodeUrl = '' }) => {
  if (!qrCodeUrl) return null;

  return <img className='qr-code' src={qrCodeUrl} alt='QR code' />;
};

export default QrCode;
