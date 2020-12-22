import React from 'react';
import { render, RenderResult, getDefaultNormalizer } from '@testing-library/react';

import HardcodedJsonInput, { HardcodedJsonInputProps } from '../../components/HardcodedJsonInput';

describe('HardcodedJsonInput component', () => {
  let props: HardcodedJsonInputProps;
  let wrapper: RenderResult;

  beforeEach(() => {
    props = {
      inputId: 'test-input-id',
      labelText: 'test label',
      value: '{ "test": "value" }'
    };

    wrapper = render(<HardcodedJsonInput {...props} />);
  });

  it('shows the correct label', () => {
    expect(wrapper.getByLabelText('test label')).toBeInTheDocument();
  });

  it('shows a disabled input', () => {
    const input = wrapper.getByLabelText('test label') as HTMLTextAreaElement;
    expect(input.disabled).toBe(true);
  });

  it('displays prettified json when possible', () => {
    expect(wrapper.queryByDisplayValue('{ "test": "value" }', {
      normalizer: getDefaultNormalizer({ collapseWhitespace: false })
    })).not.toBeInTheDocument();

    expect(wrapper.getByDisplayValue('{\n  "test": "value"\n}', {
      normalizer: getDefaultNormalizer({ collapseWhitespace: false })
    })).toBeInTheDocument();
  });
});
