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

  it('shows step 3', () => {
    expect(app.getByText('3. Verifier creates Request')).toBeInTheDocument();
  });

  it('shows step 4', () => {
    expect(app.getByText('4. Verifier shares deep link with subject.')).toBeInTheDocument();
  });

  it('shows step 5', () => {
    expect(app.getByText('5. Subject uses holder to share presentation')).toBeInTheDocument();
  });

  it('shows step 6', () => {
    expect(app.getByText('6. Verifier verifies presentation')).toBeInTheDocument();
  });

  it('shows step 7', () => {
    expect(app.getByText('7. (OPTIONAL) Issuer revokes credential')).toBeInTheDocument();
  });

  it('shows logout', () => {
    expect(app.getByText('Log Out')).toBeInTheDocument();
  });
});
