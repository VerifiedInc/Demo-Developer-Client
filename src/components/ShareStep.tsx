import React, { FC } from 'react';

import Step from './Step';
import StepLeft from './StepLeft';

const ShareStep: FC = () => {
  return (
    <Step header='5. Subject uses holder to share presentation.' >
      <StepLeft>
        (User responds to prompts in app.)
      </StepLeft>
    </Step>
  );
};

export default ShareStep;
