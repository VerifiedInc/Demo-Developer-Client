import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import App from '../App';
import { Provider } from '../context';

describe('app', () => {
  let app: RenderResult;
  beforeEach(() => {
    app = render(<div id='root'><App /></div>, { wrapper: Provider });
  });

  it('shows the intro', () => {
    expect(app.getByText('Unum ID Developer Demo')).toBeInTheDocument();
  });

  it('shows step 1', () => {
    expect(app.getByText('1. Log in with your username.')).toBeInTheDocument();
  });

  it('shows step 2', () => {
    expect(app.getByText('2. Issuer issues credential.')).toBeInTheDocument();
  });

  it('shows step 3', () => {
    expect(app.getByText('3. Verifier creates request.')).toBeInTheDocument();
  });

  it('shows step 4', () => {
    expect(app.getByText('4. Verifier shares deep link with subject.')).toBeInTheDocument();
  });

  it('shows step 5', () => {
    expect(app.getByText('5. Subject uses holder to share presentation.')).toBeInTheDocument();
  });

  it('shows step 6', () => {
    expect(app.getByText('6. Verifier verifies presentation.')).toBeInTheDocument();
  });

  it('shows step 7', () => {
    expect(app.getByText('7. (OPTIONAL) Issuer revokes credential.')).toBeInTheDocument();
  });

  it('shows logout', () => {
    expect(app.getByText('Log Out')).toBeInTheDocument();
  });

  it('shows bug report button', () => {
    expect(app.getByText('Report a Bug')).toBeInTheDocument();
  });
});
