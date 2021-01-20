import { render, screen } from '@testing-library/react';

import ErrorMessage from '../../components/ErrorMessage';

describe('ErrorMessage input', () => {
  it('displays children', () => {
    render(<ErrorMessage>test</ErrorMessage>);
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
