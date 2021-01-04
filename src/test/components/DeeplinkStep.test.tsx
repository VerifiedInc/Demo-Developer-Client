import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import DeeplinkStep, { DeeplinkStepProps } from '../../components/DeeplinkStep';
import { dummyPresentationRequestPostResponse } from '../mocks';

describe('Deeplink step component', () => {
  let props: DeeplinkStepProps;
  let wrapper: RenderResult;

  beforeEach(() => {
    props = {
      deeplink: dummyPresentationRequestPostResponse.deeplink,
      qrCodeUrl: dummyPresentationRequestPostResponse.qrCode,
      isMobile: false
    };

    wrapper = render(<DeeplinkStep {...props} />);
  });

  it('shows a QR code on desktop', () => {
    const img = wrapper.getByAltText('QR code');
    expect(img).toBeInTheDocument();
  });

  it('shows a deeplink button on mobile', () => {
    wrapper.unmount();
    props.isMobile = true;
    wrapper = render(<DeeplinkStep {...props} />);
    const link = wrapper.getByText('Deep Link');
    expect(link).toBeInTheDocument();
  });
});
