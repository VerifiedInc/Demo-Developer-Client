import React from 'react';

import { fireEvent, render, RenderResult } from '@testing-library/react';

import Input, { InputProps } from '../../components/Input';

describe('Input component', () => {
  let props: InputProps;
  let wrapper: RenderResult;

  beforeEach(() => {
    props = {
      onChange: jest.fn(),
      inputId: 'test-input-id',
      labelText: 'test label',
      placeholderText: 'test placeholder',
      value: 'test value',
      isEditable: true
    };

    wrapper = render(<Input {...props} />);
  });

  it('shows the correct label', () => {
    expect(wrapper.getByLabelText('test label')).toBeInTheDocument();
  });

  it('shows the correct placeholder', () => {
    expect(wrapper.getByPlaceholderText('test placeholder')).toBeInTheDocument();
  });

  it('shows the correct value', () => {
    expect(wrapper.getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('disables the input if it is non-editable', () => {
    wrapper.unmount();
    props.isEditable = false;
    wrapper = render(<Input {...props} />);
    const input = wrapper.getByLabelText('test label') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('handles change correctly', () => {
    const input = wrapper.getByLabelText('test label');
    fireEvent.change(input, { target: { value: 'a' } });
    expect(props.onChange).toBeCalled();
  });
});
