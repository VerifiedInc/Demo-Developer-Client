import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import Result, { ResultProps } from '../../components/Result';

describe('Result component', () => {
  let props: ResultProps;
  let wrapper: RenderResult;

  beforeEach(() => {
    props = {
      value: 'test result value',
      placeholder: 'test result placeholder',
      disabled: false,
      label: 'test result label'
    };

    wrapper = render(<Result {...props} />);
  });

  it('shows the correct label', () => {
    expect(wrapper.getByText('test result label')).toBeInTheDocument();
  });

  it('shows the correct value', () => {
    expect(wrapper.getByText('test result value')).toBeInTheDocument();
  });

  it('shows the placeholder when the Result is disabled', () => {
    wrapper.unmount();
    props.disabled = true;
    wrapper = render(<Result {...props} />);
    expect(wrapper.getByText('test result placeholder')).toBeInTheDocument();
    expect(wrapper.queryByText('test result value')).not.toBeInTheDocument();
  });
});
