import React, { FC, PropsWithChildren, ReactNode } from 'react';
import Description from './Description';
import LatoLight from './LatoLight';

import './Step.css';

export type StepProps = PropsWithChildren<{
  header: string;
  description?: ReactNode;
  image?: string;
}>;

const Step: FC<StepProps> = ({
  children = null,
  header = '',
  description = null,
  image = undefined
}) => {
  return (
    <div className='step'>
      <h2 className='step-header'>{header}</h2>
      { description && <Description><LatoLight>{description}</LatoLight></Description> }
      { image && <img className='step-banner' src={image} /> }
      <div className='step-body'>
        {children}
      </div>
    </div>
  );
};

export default Step;
