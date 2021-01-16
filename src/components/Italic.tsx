import React, { FC, PropsWithChildren } from 'react';

import './Italic.css';

export type ItalicProps = PropsWithChildren<{
  className?: string;
}>;

const Italic: FC<ItalicProps> = ({ children = null, className = undefined }) => {
  return <span className={className ? `italic ${className}` : 'italic'}>{children}</span>;
};

export default Italic;
