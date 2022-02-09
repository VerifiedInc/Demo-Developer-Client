import React, { FC, PropsWithChildren } from 'react';

type StepRightProps = PropsWithChildren<Record<string, unknown>>;

const StepRight: FC<StepRightProps> = ({ children = null }) => {
  return (
    <div className='step-right'>
      <h3>RESULT:</h3>
      {children}
    </div>
  );
};

export default StepRight;
