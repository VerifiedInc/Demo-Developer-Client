import React, { FC } from 'react';

import Description from './Description';
import './Intro.css';
import LatoLight from './LatoLight';

const Intro: FC = () => {
  return (
    <section className='intro'>
      <h1>Unum ID Developer Demo</h1>
      <Description>
        <LatoLight>
          Welcome to the Unum ID Developer Demo!
          This brief walkthrough takes no more than a few minutes to complete.
          It provides a technical introduction to how the Unum ID platform works.
        </LatoLight>
      </Description>
      <Description>
        <LatoLight>
          In this demo, you&apos;ll be playing three roles:
          (1) First you&apos;ll act as ACME Bank to send identity data to a user,
          to be stored in their ACME mobile app.
          (2) Next, you&apos;ll act as Hooli FinTech to request identity data from the ACME user.
          (3) Lastly, you&apos;ll act as the ACME user to share the requested data with Hooli,
          who will verify that it&apos;s valid.
        </LatoLight>
      </Description>
      <Description>
        <LatoLight>
          To begin, install the Developer Demo mobile app for <a href='https://play.google.com/store/apps/details?id=org.unumid.developerdemo.sandbox'>Android</a> or <a href='https://testflight.apple.com/join/GHiHo3jp'>iOS</a>.
          It will generate a username for you.
        </LatoLight>
      </Description>
    </section>
  );
};

export default Intro;
