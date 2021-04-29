import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { clear as clearMockUserAgent, mockUserAgent } from 'jest-useragent-mock';

import DeeplinkStep, { DeeplinkStepProps } from '../../components/DeeplinkStep';
import { dummyPresentationRequestPostDto } from '../mocks';

describe('Deeplink step component', () => {
  let props: DeeplinkStepProps;
  let wrapper: RenderResult;

  beforeEach(() => {
    props = {
      request: dummyPresentationRequestPostDto,
      createPresentationRequest: jest.fn()
    };

    wrapper = render(<DeeplinkStep {...props} />);
  });

  it('shows a QR code on desktop', () => {
    const img = wrapper.getByAltText('qr code');
    expect(img).toBeInTheDocument();
  });

  it('shows a deeplink button on mobile', () => {
    wrapper.unmount();
    mockUserAgent('iPhone');
    wrapper = render(<DeeplinkStep {...props} />);
    const link = wrapper.getByAltText('Verify with Unum ID Developer Demo');
    expect(link).toBeInTheDocument();
    clearMockUserAgent();
  });
});
