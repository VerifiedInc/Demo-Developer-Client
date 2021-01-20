import { FC } from 'react';
import Bold from './Bold';

import './ErrorMessage.css';

const ErrorMessage: FC = ({ children = null }) => {
  if (!children) return null;

  return <p className='error-message'><Bold>{children}</Bold></p>;
};

export default ErrorMessage;
