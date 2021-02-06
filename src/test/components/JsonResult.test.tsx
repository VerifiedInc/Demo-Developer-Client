import React from 'react';
import { render, RenderResult, getDefaultNormalizer } from '@testing-library/react';

import JsonResult, { JsonResultProps } from '../../components/JsonResult';

describe('JsonResult component', () => {
  let props: JsonResultProps;
  let wrapper: RenderResult;

  beforeEach(() => {
    props = {
      value: { test: 'value' },
      placeholder: 'test json result placeholder',
      disabled: false,
      label: 'test json result label'
    };

    wrapper = render(<JsonResult {...props} />);
  });

  it('shows the correct label', () => {
    expect(wrapper.getByText('test json result label')).toBeInTheDocument();
  });

  it('shows the prettified json', () => {
    expect(wrapper.queryByText('{ "test": "value" }', {
      normalizer: getDefaultNormalizer({ collapseWhitespace: false })
    })).not.toBeInTheDocument();

    // unfortunately, there isn't really a better way to test that react-json-view
    // is displaying the correct values as the json is broken up between lots of different elements
    expect(wrapper.getByText('test')).toBeInTheDocument();
    expect(wrapper.getByText(/value/i)).toBeInTheDocument();
  });

  it('shows the placeholder when the JsonResult is disabled', () => {
    wrapper.unmount();
    props.disabled = true;
    wrapper = render(<JsonResult {...props} />);
    expect(wrapper.getByText('test json result placeholder')).toBeInTheDocument();
    expect(wrapper.queryByText('test')).not.toBeInTheDocument();
    expect(wrapper.queryByText(/value/i)).not.toBeInTheDocument();
  });
});
