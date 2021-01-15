import React, { FC } from 'react';

import Step from './Step';

const ShareStep: FC = () => {
  const header = '5. Subject uses holder to share presentation.';
  const description = (
    <>
      In this step, you'll act as a subject (user), the one who decides whether they want to share the requested data.
      Respond to the prompt in your mobile app. (A "holder" is just a mobile app, in this case the Unum ID Developer Demo app.)
    </>
  );
  return (
    <Step header={header} description={description} />
  );
};

export default ShareStep;
