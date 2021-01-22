import React, { FC } from 'react';

import Description from './Description';
import './Intro.css';

const Intro: FC = () => {
  return (
    <section className='intro'>
      <h1>Unum ID Developer Demo</h1>
      <Description>
        Welcome to the Unum ID Developer Demo!
        This brief walkthrough takes no more than a few minutes to complete.
        It provides a technical introduction to how the Unum ID platform works.
      </Description>
      <Description>
        In this demo, you&apos;ll be playing three roles:
        (1) First you&apos;ll act as ACME Bank to send identity data to a user,
        to be stored in their ACME mobile app.
        (2) Next, you&apos;ll act as Hooli FinTech to request identity data from the ACME user.
        (3) Lastly, you&apos;ll act as the ACME user to share the requested data with Hooli,
        who will verify that it&apos;s valid.
      </Description>
      <Description>
        To begin, install the Developer Demo mobile app <a href=''>here</a>.
        It will generate a usename for you.
      </Description>
    </section>
  );
};

export default Intro;
