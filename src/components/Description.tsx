import React, { FC, PropsWithChildren } from 'react';
import './Description.css';

type DescriptionProps = PropsWithChildren<{}>;

const Description: FC<DescriptionProps> = ({ children = null }) => {
  return (
    <div className='description'>{children}</div>
  );
};

export default Description;
