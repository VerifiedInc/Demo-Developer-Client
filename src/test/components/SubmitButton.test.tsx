import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';

import SubmitButton, { SubmitButtonProps } from '../../components/SubmitButton';

describe('submitButton component', () => {
  let props: SubmitButtonProps;
  let wrapper: RenderResult;

  beforeEach(() => {
    props = {
      onClick: jest.fn(),
      disabled: false,
      text: 'test submit'
    };

    wrapper = render(<SubmitButton {...props} />);
  });

  it('shows the correct text', () => {
    expect(wrapper.getByText('test submit')).toBeInTheDocument();
  });

  it('handles click correctly', () => {
    const button = wrapper.getByText('test submit');
    fireEvent.click(button);
    expect(props.onClick).toBeCalled();
  });

  it('disables button correctly', () => {
    wrapper.unmount();
    props.disabled = true;
    wrapper = render(<SubmitButton {...props} />);
    const button = wrapper.getByText('test submit') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });
});
