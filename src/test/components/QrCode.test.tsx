import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import QrCode, { QrCodeProps } from '../../components/QrCode';
import { dummyPresentationRequestPostResponse } from '../mocks';

describe('qrCode component', () => {
  let props: QrCodeProps;
  let wrapper: RenderResult;

  beforeEach(() => {
    props = {
      qrCodeUrl: dummyPresentationRequestPostResponse.qrCode
    };

    wrapper = render(<QrCode {...props} />);
  });

  it('shows the qr code', () => {
    const img = wrapper.getByAltText('QR code');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', props.qrCodeUrl);
  });

  it('does not show the image if no qr code url is provided', () => {
    wrapper.unmount();
    props.qrCodeUrl = '';
    wrapper = render(<QrCode {...props} />);
    expect(wrapper.queryByAltText('QR code')).not.toBeInTheDocument();
  });
});
