import React, { FC, PropsWithChildren } from 'react';

import './Step.css';

export type StepProps = PropsWithChildren<{
  header: string;
}>;

const Step: FC<StepProps> = ({
  children = null,
  header = ''
}) => {
  return (
    <div className='step'>
      <h2 className='step-header'>{header}</h2>
      <div className='step-body'>
        {children}
      </div>
    </div>
  );
};

export default Step;
