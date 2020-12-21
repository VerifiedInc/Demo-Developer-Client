import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import HardcodedInput, { HardcodedInputProps } from '../../components/HardcodedInput';

describe('HardcodedInput component', () => {
  let props: HardcodedInputProps;
  let wrapper: RenderResult;

  beforeEach(() => {
    props = {
      inputId: 'test-input-id',
      labelText: 'test label',
      value: 'test value',
      type: 'text'
    };

    wrapper = render(<HardcodedInput {...props} />);
  });

  it('shows the correct label', () => {
    expect(wrapper.getByLabelText('test label')).toBeInTheDocument();
  });

  it('shows the correct value', () => {
    expect(wrapper.getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('shows a disabled input', () => {
    const input = wrapper.getByLabelText('test label') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});
