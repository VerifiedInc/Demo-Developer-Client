import React, { FC, PropsWithChildren } from 'react';
import './Description.css';

type DescriptionProps = PropsWithChildren<{}>;

const Description: FC<DescriptionProps> = ({ children = null }) => {
  return (
    <p className='description'>{children}</p>
  );
};

export default Description;
