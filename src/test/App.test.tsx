import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import App from '../App';
import { Provider } from '../context';

describe('app', () => {
  let app: RenderResult;
  beforeEach(() => {
    app = render(<App />, { wrapper: Provider });
  });

  it('shows step 1', () => {
    expect(app.getByText('1. Log In with your username')).toBeInTheDocument();
  });

  it('shows step 2', () => {
    expect(app.getByText('2. Issue a Credential')).toBeInTheDocument();
  });
});
