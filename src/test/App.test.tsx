import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import App from '../App';
import { Provider } from '../context';

describe('app', () => {
  let app: RenderResult;
  beforeAll(() => {
    app = render(<App />, { wrapper: Provider });
  });

  it('shows step 1', () => {
    expect(app.getByText('1. Log In with your username')).toBeInTheDocument();
  });
});
