import React from 'react';
import { render, RenderResult, fireEvent, getDefaultNormalizer } from '@testing-library/react';

import JsonInput, { JsonInputProps } from '../../components/JsonInput';

describe('JsonInput component', () => {
  let props: JsonInputProps;
  let wrapper: RenderResult;

  beforeEach(() => {
    props = {
      inputId: 'test-json-input',
      labelText: 'test json label',
      placeholderText: 'test json placeholder',
      isEditable: true,
      value: { test: 'value' },
      onEdit: jest.fn()
    };
    wrapper = render(<JsonInput {...props} />);
  });

  it('shows the correct label', () => {
    expect(wrapper.getByLabelText('test json label')).toBeInTheDocument();
  });

  it('shows the correct placeholder', () => {
    expect(wrapper.getByPlaceholderText('test json placeholder')).toBeInTheDocument();
  });

  it('disables the input if it is non-editable', () => {
    wrapper.unmount();
    props.isEditable = false;
    wrapper = render(<JsonInput {...props} />);
    const input = wrapper.getByLabelText('test json label') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('handles change correctly', () => {
    const input = wrapper.getByLabelText('test json label');
    fireEvent.change(input, { target: { value: 'a' } });
    expect(props.onEdit).toBeCalled();
  });

  it('displays prettified json when possible', () => {
    expect(wrapper.queryByDisplayValue('{ "test": "value" }', {
      normalizer: getDefaultNormalizer({ collapseWhitespace: false })
    })).not.toBeInTheDocument();

    expect(wrapper.getByDisplayValue('{\n  "test": "value"\n}', {
      normalizer: getDefaultNormalizer({ collapseWhitespace: false })
    })).toBeInTheDocument();
  });

  // xit('displays the value as-is when it cannot be prettified', () => {
  //   wrapper.unmount();
  //   props.value = '{ "test":';
  //   wrapper = render(<JsonInput {...props} />);
  //   expect(wrapper.getByDisplayValue('{ "test":')).toBeInTheDocument();
  // });

  it('renders the error message if one exists', () => {
    props.errorMessage = 'test error';
    wrapper = render(<JsonInput {...props} />);
    expect(wrapper.getByText('test error')).toBeInTheDocument();
  });
});
