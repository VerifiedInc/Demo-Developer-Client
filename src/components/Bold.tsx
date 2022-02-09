import React, { FC, PropsWithChildren } from 'react';

import './Bold.css';

export type BoldProps = PropsWithChildren<Record<string, unknown>>;

const Bold: FC<BoldProps> = ({ children = null }) => {
  return <span className='bold'>{children}</span>;
};

export default Bold;
