import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import Step, { StepProps } from '../../components/Step';

describe('Step component', () => {
  let props: StepProps;
  let wrapper: RenderResult;

  beforeEach(() => {
    props = {
      header: 'Test Step Header'
    };

    wrapper = render(<Step {...props}>test children</Step>);
  });

  it('renders the correct header', () => {
    expect(wrapper.getByText('Test Step Header')).toBeInTheDocument();
  });

  it('renders children', () => {
    expect(wrapper.getByText('test children')).toBeInTheDocument();
  });
});
