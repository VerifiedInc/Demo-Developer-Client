import React, { FC, PropsWithChildren } from 'react';

type StepLeftProps = PropsWithChildren<{}>;

const StepLeft: FC<StepLeftProps> = ({ children = null }) => {
  return (
    <div className='step-left'>{children}</div>
  );
};

export default StepLeft;
