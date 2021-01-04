import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import DeeplinkButton, { DeeplinkButtonProps } from '../../components/DeeplinkButton';
import { dummyPresentationRequestPostResponse } from '../mocks';

describe('deeplink button component', () => {
  let props: DeeplinkButtonProps;
  let wrapper: RenderResult;

  beforeEach(() => {
    props = {
      deeplink: dummyPresentationRequestPostResponse.deeplink
    };

    wrapper = render(<DeeplinkButton {...props} />);
  });

  it('shows the deeplink button', () => {
    const link = wrapper.getByText('Deep Link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', props.deeplink);
  });

  it('does not show the button if no deeplink is provided', () => {
    wrapper.unmount();
    props.deeplink = '';
    wrapper = render(<DeeplinkButton {...props} />);
    expect(wrapper.queryByText('Deep Link')).not.toBeInTheDocument();
  });
});
